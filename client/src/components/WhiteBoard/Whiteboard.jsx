import { Box } from "@radix-ui/themes";
import { useEffect, useRef, useState, useCallback } from "react";
import rough from "roughjs/bin/rough";
import WhiteboardControls from "./WhiteboardControls";
import {
  drawPencil,
  drawEllipse,
  drawLine,
  drawRectangle,
  drawText,
  isPointInsideBox,
  isPointNearLine,
  getContextWithTransform,
  clearCanvasWithTransform,
  drawElements,
} from "../../utils/whiteboard/helpers";
import {
  resizeCanvasToContainer,
  setupUndoHandler,
  setupZoomHandlers,
} from "../../utils/whiteboard/handlers";

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

  const getMouseCoords = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - offset.x) / scale,
      y: (e.clientY - rect.top - offset.y) / scale,
    };
  };

  const handleMouseDown = (e) => {
    const pos = getMouseCoords(e);

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
      eraseAtPosition(pos);
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
    const pos = getMouseCoords(e);

    if (currentElement.type === "pencil") {
      const newPoints = [...currentElement.points, pos];
      setCurrentElement({ ...currentElement, points: newPoints });
      drawTempCanvas({ ...currentElement, points: newPoints });
    } else {
      const updated = { ...currentElement, end: pos };
      setCurrentElement(updated);
      drawTempCanvas(updated);
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
    clearTempCanvas();
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

  const eraseAtPosition = (pos) => {
    const radius = 10;
    const filtered = elementsRef.current.filter((el) => {
      if (el.type === "pencil") {
        return !el.points.some(
          (p) => Math.hypot(p.x - pos.x, p.y - pos.y) < radius
        );
      } else if (el.type === "line") {
        return !isPointNearLine(pos, el.start, el.end, radius);
      } else if (["rectangle", "ellipse"].includes(el.type)) {
        return !isPointInsideBox(pos, el.start, el.end, radius);
      } else if (el.type === "text") {
        return !(Math.abs(el.x - pos.x) < 20 && Math.abs(el.y - pos.y) < 20);
      }
      return true;
    });

    elementsRef.current = filtered;

    // Push snapshot to history
    historyRef.current.push([...filtered]);

    redrawMainCanvas();
  };

  const drawTempCanvas = (el) => {
    const canvas = tempCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.setTransform(scale, 0, 0, scale, offset.x, offset.y);
    ctx.clearRect(
      -offset.x / scale,
      -offset.y / scale,
      canvas.width / scale,
      canvas.height / scale
    );
    const rc = rough.canvas(canvas);
    drawElement(rc, ctx, el);
    ctx.restore();
  };

  const clearTempCanvas = () => {
    const canvas = tempCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.save();
    ctx.setTransform(scale, 0, 0, scale, offset.x, offset.y);
    ctx.clearRect(
      -offset.x / scale,
      -offset.y / scale,
      canvas.width / scale,
      canvas.height / scale
    );
    ctx.restore();
  };

  return (
    <Box
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
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

      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
        }}
      />
      <canvas
        ref={tempCanvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 2,
          cursor:
            activeTool === "eraser"
              ? "cell"
              : activeTool === "hand"
              ? "grab"
              : "crosshair",
        }}
      />

      {textInput.visible && (
        <input
          ref={inputRef}
          style={{
            backgroundColor: "white",
            color: "black",
            position: "absolute",
            left: textInput.x,
            top: textInput.y,
            zIndex: 10,
            fontSize: "20px",
            border: "1px solid gray",
            padding: "4px",
            outline: "none",
          }}
          value={textInput.value}
          onChange={(e) =>
            setTextInput({ ...textInput, value: e.target.value })
          }
          onBlur={handleTextSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleTextSubmit();
            }
          }}
        />
      )}
    </Box>
  );
}

export default Whiteboard;
