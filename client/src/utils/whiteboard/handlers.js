export const resizeCanvasToContainer = (canvasRef, tempCanvasRef, containerRef, redrawMainCanvas) => {
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
