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

function Whiteboard() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const tempCanvasRef = useRef(null);
  const inputRef = useRef(null);
  const elementsRef = useRef([]);
  const panStart = useRef({ x: 0, y: 0 });
  const historyRef = useRef([[]]);

  const [pencilColor, setPencilColor] = useState("#000000");
  const [activeTool, setActiveTool] = useState("pencil");
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

  // Main draw function
  const drawElement = useCallback(
    (rc, ctx, el) => {
      switch (el.type) {
        case "pencil":
          drawPencil(ctx, el);
          break;
        case "line":
          drawLine(rc, el);
          break;
        case "rectangle":
          drawRectangle(rc, el);
          break;
        case "ellipse":
          drawEllipse(rc, el);
          break;
        case "text":
          drawText(ctx, el, darkTheme);
          break;
        default:
          break;
      }
    },
    [darkTheme]
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
    const cleanupZoom = setupZoomHandlers(setScale);
    return cleanupZoom;
  }, []);

  useEffect(() => {
    const cleanupUndo = setupUndoHandler(
      historyRef,
      elementsRef,
      redrawMainCanvas
    );
    return cleanupUndo;
  }, [redrawMainCanvas]);

  const handleMouseDown = (e) => {
    const pos = getMouseCoords(e, canvasRef, offset, scale);

    if (activeTool === "hand") {
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

    setIsDrawing(true);
    if (activeTool === "pencil") {
      setCurrentElement({ type: "pencil", points: [pos], color: pencilColor });
    } else if (["rectangle", "ellipse", "line"].includes(activeTool)) {
      setCurrentElement({ type: activeTool, start: pos, end: pos });
    } else if (activeTool === "eraser") {
      eraseAtPosition(pos, elementsRef, historyRef, redrawMainCanvas);
    }
  };

  const handleMouseMove = (e) => {
    if (isPanning) {
      const dx = e.clientX - panStart.current.x;
      const dy = e.clientY - panStart.current.y;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      panStart.current = { x: e.clientX, y: e.clientY };
      return;
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

  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }

    if (currentElement) {
      const updatedElements = [...elementsRef.current, currentElement];
      elementsRef.current = updatedElements;
      historyRef.current.push(updatedElements);
    }

    setCurrentElement(null);
    setIsDrawing(false);
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
        backgroundColor: darkTheme ? "black" : "white",
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
          cursor:
            activeTool === "eraser"
              ? "cell"
              : activeTool === "hand"
              ? "grab"
              : "crosshair",
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
