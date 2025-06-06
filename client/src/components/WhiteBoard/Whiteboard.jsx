import { Box } from "@radix-ui/themes";
import "./Whiteboard.css";
import { useEffect, useRef, useState, useCallback } from "react";
import WhiteboardControls from "./WhiteboardControls";
import {
  drawPencil,
  drawEllipse,
  drawLine,
  drawRectangle,
  drawText,
  getContextWithTransform,
  clearCanvasWithTransform,
  drawElements,
  getMouseCoords,
  isInsideElement,
} from "../../utils/whiteboard/helpers";
import {
  resizeCanvasToContainer,
  setupUndoHandler,
  setupZoomHandlers,
  drawTempCanvas,
  clearTempCanvas,
  eraseAtPosition,
} from "../../utils/whiteboard/handlers";
import WhiteboardTextInput from "./WhiteboardTextInput";
import socket from "../../socket";
import { EVENTS } from "../../utils/constants";

function Whiteboard({ roomId }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const tempCanvasRef = useRef(null);
  const inputRef = useRef(null);
  const elementsRef = useRef([]);
  const panStart = useRef({ x: 0, y: 0 });
  const historyRef = useRef([[]]);

  const [pencilColor, setPencilColor] = useState("#000000");
  const [shapeColor, setShapeColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [textInput, setTextInput] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: "",
  });
  const [selectedElementIndex, setSelectedElementIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [pencilStrokeWidth, setPencilStrokeWidth] = useState(4);
  const [shapeStrokeWidth, setShapeStrokeWidth] = useState(3);

  const cursorMap = {
    eraser: "cell",
    hand: "grab",
    select: "default",
    text: "text",
  };

  // Main draw function
  const drawElement = useCallback(
    (rc, ctx, el, index) => {
      const isSelected = index === selectedElementIndex;

      switch (el.type) {
        case "pencil":
          drawPencil(ctx, el, isSelected);
          break;
        case "line":
          drawLine(rc, el, isSelected);
          break;
        case "rectangle":
          drawRectangle(rc, el, isSelected);
          break;
        case "ellipse":
          drawEllipse(rc, el, isSelected);
          break;
        case "text":
          drawText(ctx, el, darkTheme, isSelected);
          break;
        default:
          break;
      }
    },
    [darkTheme, selectedElementIndex]
  );

  const redrawMainCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getContextWithTransform(canvas, scale, offset);
    clearCanvasWithTransform(ctx, canvas, scale, offset);
    drawElements(canvas, ctx, elementsRef.current, drawElement);
    ctx.restore();
  }, [scale, offset, drawElement]);

  useEffect(() => {
    const resize = () =>
      resizeCanvasToContainer(
        canvasRef,
        tempCanvasRef,
        containerRef,
        redrawMainCanvas
      );

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [scale, offset, redrawMainCanvas]);

  useEffect(() => {
    const cleanupZoom = setupZoomHandlers(setScale, setOffset, canvasRef);
    return cleanupZoom;
  }, []);

  useEffect(() => {
    const cleanupUndo = setupUndoHandler(
      historyRef,
      elementsRef,
      redrawMainCanvas,
      socket,
      roomId
    );
    return cleanupUndo;
  }, [redrawMainCanvas, roomId]);

  useEffect(() => {
    const preventMiddleClickScroll = (e) => {
      if (e.button === 1) {
        e.preventDefault();
      }
    };

    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", preventMiddleClickScroll);

    return () => {
      canvas.removeEventListener("mousedown", preventMiddleClickScroll);
    };
  }, []);

  // socket useEffect
  useEffect(() => {
    socket.on(EVENTS.WHITEBOARD.DRAW, ({ element, userId }) => {
      if (userId === socket.id) return;
      console.log("recived drawing");
      elementsRef.current = [...elementsRef.current, element];
      redrawMainCanvas();
    });

    socket.on(EVENTS.WHITEBOARD.UNDO, ({ userId, elements }) => {
      if (userId === socket.id) return;

      elementsRef.current = elements;
      historyRef.current.push(elements);
      redrawMainCanvas();
    });

    // TODO
    // socket.on(EVENTS.WHITEBOARD.CLEAR, () => {
    //   elementsRef.current = [];
    //   historyRef.current = [];
    //   redrawMainCanvas();
    // });

    socket.on(EVENTS.WHITEBOARD.ERASE, ({ pos, userId }) => {
      if (userId === socket.id) return;
      eraseAtPosition(pos, elementsRef, historyRef, redrawMainCanvas);
    });

    socket.on(EVENTS.WHITEBOARD.MOVE, ({ index, updatedElement, userId }) => {
      if (userId === socket.id) return;
      elementsRef.current[index] = updatedElement;
      historyRef.current.push([...elementsRef.current]);
      redrawMainCanvas();
    });

    return () => {
      socket.off(EVENTS.WHITEBOARD.DRAW);
      socket.off(EVENTS.WHITEBOARD.UNDO);
      socket.off(EVENTS.WHITEBOARD.ERASE);
      socket.off(EVENTS.WHITEBOARD.MOVE);
    };
  }, [redrawMainCanvas]);

  const handleMouseDown = (e) => {
    const pos = getMouseCoords(e, canvasRef, offset, scale);

    if (activeTool === "hand" || e.button === 1) {
      setIsPanning(true);
      panStart.current = { x: e.clientX, y: e.clientY };
      return;
    }

    if (activeTool === "text") {
      const containerRect = containerRef.current.getBoundingClientRect();
      setTextInput({
        visible: true,
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top,
        value: "",
        canvasX: pos.x,
        canvasY: pos.y,
      });
      setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }

    if (activeTool === "select") {
      const pos = getMouseCoords(e, canvasRef, offset, scale);
      for (let i = elementsRef.current.length - 1; i >= 0; i--) {
        const el = elementsRef.current[i];
        if (isInsideElement(pos, el)) {
          setSelectedElementIndex(i);
          let elX = 0,
            elY = 0;

          if (el.type === "text") {
            elX = el.x;
            elY = el.y;
          } else if (["rectangle", "ellipse", "line"].includes(el.type)) {
            elX = el.start.x;
            elY = el.start.y;
          } else if (el.type === "pencil") {
            elX = el.points[0].x;
            elY = el.points[0].y;
          }

          setDragOffset({
            x: pos.x - elX,
            y: pos.y - elY,
          });

          setIsDrawing(true);

          return;
        }
      }
      setSelectedElementIndex(null);
    }

    setIsDrawing(true);

    if (activeTool === "pencil") {
      setCurrentElement({
        type: "pencil",
        points: [pos],
        color: pencilColor,
        strokeWidth: pencilStrokeWidth,
      });
    } else if (["rectangle", "ellipse", "line"].includes(activeTool)) {
      const seed = Math.floor(Math.random() * 1000000);
      setCurrentElement({
        type: activeTool,
        start: pos,
        end: pos,
        options: {
          stroke: shapeColor,
          strokeWidth: shapeStrokeWidth,
          roughness: 1,
          seed,
        },
      });
    } else if (activeTool === "eraser") {
      // eraseAtPosition(pos, elementsRef, historyRef, redrawMainCanvas);
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 4 && !isPanning) return;

    if (isPanning || e.buttons === 4) {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      panStart.current = { x: e.clientX, y: e.clientY };
      return;
    }

    if (activeTool === "eraser" && isDrawing) {
      const pos = getMouseCoords(e, canvasRef, offset, scale);
      eraseAtPosition(pos, elementsRef, historyRef, redrawMainCanvas);

      socket.emit(EVENTS.WHITEBOARD.ERASE, { roomId, userId: socket.id, pos });
      return;
    }

    if (
      activeTool === "select" &&
      isDrawing &&
      selectedElementIndex !== null &&
      e.buttons === 1
    ) {
      const pos = getMouseCoords(e, canvasRef, offset, scale);
      const elements = [...elementsRef.current];
      const el = { ...elements[selectedElementIndex] };

      const dx = pos.x - dragOffset.x;
      const dy = pos.y - dragOffset.y;

      if (el.type === "text") {
        el.x = dx;
        el.y = dy;
      } else if (["rectangle", "ellipse", "line"].includes(el.type)) {
        const width = el.end.x - el.start.x;
        const height = el.end.y - el.start.y;

        el.start = { x: dx, y: dy };
        el.end = { x: dx + width, y: dy + height };
      } else if (el.type === "pencil") {
        const movedPoints = el.points.map((pt) => ({
          x: pt.x - (el.points[0].x - dx),
          y: pt.y - (el.points[0].y - dy),
        }));
        el.points = movedPoints;
      }

      elements[selectedElementIndex] = el;
      elementsRef.current = elements;
      redrawMainCanvas();
    }

    if (!isDrawing || !currentElement) return;

    const pos = getMouseCoords(e, canvasRef, offset, scale);

    if (currentElement.type === "pencil") {
      const newPoints = [...currentElement.points, pos];
      setCurrentElement({ ...currentElement, points: newPoints });
      drawTempCanvas(
        tempCanvasRef,
        { ...currentElement, points: newPoints },
        scale,
        offset,
        drawElement
      );
    } else {
      const updated = { ...currentElement, end: pos };
      setCurrentElement(updated);
      drawTempCanvas(tempCanvasRef, updated, scale, offset, drawElement);
    }
  };

  const handleMouseUp = (e) => {
    if (isPanning || e.button === 1) {
      setIsPanning(false);
      return;
    }

    if (currentElement) {
      const updatedElements = [...elementsRef.current, currentElement];
      elementsRef.current = updatedElements;
      historyRef.current.push(updatedElements);

      socket.emit(EVENTS.WHITEBOARD.DRAW, {
        roomId,
        userId: socket.id,
        element: currentElement,
      });
    }
    if (activeTool === "select" && selectedElementIndex !== null) {
      const updatedElement = elementsRef.current[selectedElementIndex];
      historyRef.current.push([...elementsRef.current]);

      socket.emit(EVENTS.WHITEBOARD.MOVE, {
        roomId,
        userId: socket.id,
        index: selectedElementIndex,
        updatedElement
      });
    }

    setIsDrawing(false);
    setCurrentElement(null);
    clearTempCanvas(tempCanvasRef, scale, offset);
    redrawMainCanvas();
  };

  const handleTextSubmit = () => {
    if (!textInput.value.trim()) {
      setTextInput({ visible: false, x: 0, y: 0, value: "" });
      return;
    }

    const newText = {
      type: "text",
      x: textInput.canvasX,
      y: textInput.canvasY,
      value: textInput.value.trim(),
    };

    const updatedElements = [...elementsRef.current, newText];
    elementsRef.current = updatedElements;
    historyRef.current.push(updatedElements);

    socket.emit(EVENTS.WHITEBOARD.DRAW, {
      roomId,
      userId: socket.id,
      element: newText,
    });

    setTextInput({ visible: false, x: 0, y: 0, value: "" });
    redrawMainCanvas();
  };

  return (
    <Box
      ref={containerRef}
      position="relative"
      width="100%"
      height="100%"
      style={{
        backgroundColor: darkTheme ? "#343541" : "white",
        overflow: "hidden",
      }}
    >
      <WhiteboardControls
        setDarkTheme={setDarkTheme}
        darkTheme={darkTheme}
        setActiveTool={setActiveTool}
        activeTool={activeTool}
        pencilColor={pencilColor}
        setPencilColor={setPencilColor}
        shapeColor={shapeColor}
        setShapeColor={setShapeColor}
        pencilStrokeWidth={pencilStrokeWidth}
        setPencileStrokeWidth={setPencilStrokeWidth}
        shapeStrokeWidth={shapeStrokeWidth}
        setShapeStrokeWidth={setShapeStrokeWidth}
      />

      <canvas ref={canvasRef} className="whiteboardCanvas" />
      <canvas
        ref={tempCanvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="tempCanvas"
        style={{
          cursor: cursorMap[activeTool] || "crosshair",
        }}
      />

      {textInput.visible && (
        <WhiteboardTextInput
          inputRef={inputRef}
          textInput={textInput}
          setTextInput={setTextInput}
          handleTextSubmit={handleTextSubmit}
        />
      )}
    </Box>
  );
}

export default Whiteboard;
