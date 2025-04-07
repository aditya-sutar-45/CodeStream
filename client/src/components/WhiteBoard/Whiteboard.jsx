import { Box } from "@radix-ui/themes";
import { useEffect, useRef, useState, useCallback } from "react";
import rough from "roughjs/bin/rough";
import WhiteboardControls from "./WhiteboardControls";
import {
  isPointInsideBox,
  isPointNearLine,
} from "../../utils/whiteboard/helpers";

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

  const drawElement = useCallback(
    (rc, ctx, el) => {
      switch (el.type) {
        case "pencil":
          ctx.strokeStyle = el.color || "#000000";
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let i = 1; i < el.points.length; i++) {
            const from = el.points[i - 1];
            const to = el.points[i];
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
          }
          ctx.stroke();
          break;

        case "line":
          rc.line(el.start.x, el.start.y, el.end.x, el.end.y);
          break;
        case "rectangle":
          rc.rectangle(
            el.start.x,
            el.start.y,
            el.end.x - el.start.x,
            el.end.y - el.start.y
          );
          break;
        case "ellipse":
          rc.ellipse(
            (el.start.x + el.end.x) / 2,
            (el.start.y + el.end.y) / 2,
            Math.abs(el.end.x - el.start.x),
            Math.abs(el.end.y - el.start.y)
          );
          break;
        case "text":
          ctx.fillStyle = darkTheme ? "white" : "black";
          ctx.font = "20px Arial";
          ctx.fillText(el.value, el.x, el.y);
          break;
      }
    },
    [darkTheme]
  );

  const redrawMainCanvas = useCallback(() => {
    const canvas = canvasRef.current;
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
    elementsRef.current.forEach((el) => drawElement(rc, ctx, el));
    ctx.restore();
  }, [scale, offset.x, offset.y, drawElement]);

  // Resize and initial draw
  useEffect(() => {
    const resizeCanvas = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const tempCanvas = tempCanvasRef.current;
      if (!container || !canvas || !tempCanvas) return;

      const { width, height } = container.getBoundingClientRect();
      canvas.width = tempCanvas.width = width;
      canvas.height = tempCanvas.height = height;

      redrawMainCanvas();
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [scale, offset, redrawMainCanvas]);

  // Zoom handlers
  useEffect(() => {
    const handleZoomKeys = (e) => {
      if (e.ctrlKey) {
        if (e.key === "+") {
          setScale((prev) => Math.min(prev + 0.1, 5));
          e.preventDefault();
        } else if (e.key === "-") {
          setScale((prev) => Math.max(prev - 0.1, 0.2));
          e.preventDefault();
        }
      }
    };

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const direction = e.deltaY > 0 ? -1 : 1;
        setScale((prev) => {
          const newScale = prev + direction * 0.1;
          return Math.max(0.2, Math.min(5, newScale));
        });
      }
    };

    window.addEventListener("keydown", handleZoomKeys);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleZoomKeys);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Undo handler
  useEffect(() => {
    const handleUndo = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (historyRef.current.length > 1) {
          historyRef.current = historyRef.current.slice(0, -1);
          const lastState = historyRef.current[historyRef.current.length - 1];
          elementsRef.current = lastState;
          redrawMainCanvas();
        } else {
          elementsRef.current = [];
          historyRef.current = [[]];
          redrawMainCanvas();
        }
      }
    };

    window.addEventListener("keydown", handleUndo);
    return () => window.removeEventListener("keydown", handleUndo);
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
