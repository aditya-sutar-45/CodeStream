import rough from "roughjs/bin/rough";
import { isPointInsideBox, isPointNearLine } from "./helpers";

export const resizeCanvasToContainer = (
  canvasRef,
  tempCanvasRef,
  containerRef,
  redrawMainCanvas
) => {
  const container = containerRef.current;
  const canvas = canvasRef.current;
  const tempCanvas = tempCanvasRef.current;
  if (!container || !canvas || !tempCanvas) return;

  const { width, height } = container.getBoundingClientRect();
  canvas.width = tempCanvas.width = width;
  canvas.height = tempCanvas.height = height;

  redrawMainCanvas();
};

export const setupZoomHandlers = (setScale) => {
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
      setScale((prev) => Math.max(0.2, Math.min(5, prev + direction * 0.1)));
    }
  };

  window.addEventListener("keydown", handleZoomKeys);
  window.addEventListener("wheel", handleWheel, { passive: false });

  return () => {
    window.removeEventListener("keydown", handleZoomKeys);
    window.removeEventListener("wheel", handleWheel);
  };
};

export const setupUndoHandler = (historyRef, elementsRef, redrawMainCanvas) => {
  const handleUndo = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "z") {
      e.preventDefault();
      if (historyRef.current.length > 1) {
        historyRef.current = historyRef.current.slice(0, -1);
        const lastState = historyRef.current[historyRef.current.length - 1];
        elementsRef.current = lastState;
      } else {
        elementsRef.current = [];
        historyRef.current = [[]];
      }
      redrawMainCanvas();
    }
  };

  window.addEventListener("keydown", handleUndo);
  return () => window.removeEventListener("keydown", handleUndo);
};

export const drawTempCanvas = (
  tempCanvasRef,
  el,
  scale,
  offset,
  drawElement
) => {
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

export const clearTempCanvas = (tempCanvasRef, scale, offset) => {
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

export const eraseAtPosition = (
  pos,
  elementsRef,
  historyRef,
  redrawMainCanvas
) => {
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
  historyRef.current.push([...filtered]);
  redrawMainCanvas();
};
