import rough from "roughjs/bundled/rough.esm.js";

export function isPointNearLine(point, start, end, threshold) {
  const A = point.x - start.x;
  const B = point.y - start.y;
  const C = end.x - start.x;
  const D = end.y - start.y;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  const param = len_sq ? dot / len_sq : -1;

  const xx = param < 0 ? start.x : param > 1 ? end.x : start.x + param * C;
  const yy = param < 0 ? start.y : param > 1 ? end.y : start.y + param * D;

  return Math.hypot(point.x - xx, point.y - yy) < threshold;
}

export function isPointInsideBox(point, start, end, padding = 0) {
  const minX = Math.min(start.x, end.x) - padding;
  const maxX = Math.max(start.x, end.x) + padding;
  const minY = Math.min(start.y, end.y) - padding;
  const maxY = Math.max(start.y, end.y) + padding;
  return (
    point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY
  );
}

export const drawPencil = (ctx, el) => {
  const points = el.points;
  if (points.length < 2) return;

  ctx.strokeStyle = el.color || "#000000";
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length - 1; i++) {
    const midPointX = (points[i].x + points[i + 1].x) / 2;
    const midPointY = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, midPointX, midPointY);
  }

  // Draw last line
  const last = points[points.length - 1];
  ctx.lineTo(last.x, last.y);
  ctx.stroke();
};


export const drawLine = (rc, el) => {
  rc.line(el.start.x, el.start.y, el.end.x, el.end.y, {
    ...el.options, // Use the options object to pass the seed
  });
};

export const drawRectangle = (rc, el) => {
  rc.rectangle(
    el.start.x,
    el.start.y,
    el.end.x - el.start.x,
    el.end.y - el.start.y,
    el.options
  );
};

export const drawEllipse = (rc, el) => {
  rc.ellipse(
    (el.start.x + el.end.x) / 2,
    (el.start.y + el.end.y) / 2,
    Math.abs(el.end.x - el.start.x),
    Math.abs(el.end.y - el.start.y),
    el.options
  );
};

export const drawText = (ctx, el, darkTheme) => {
  ctx.fillStyle = darkTheme ? "white" : "black";
  ctx.font = "20px Arial";
  ctx.fillText(el.value, el.x, el.y);
};

export const getContextWithTransform = (canvas, scale, offset) => {
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.setTransform(scale, 0, 0, scale, offset.x, offset.y);
  return ctx;
};

export const clearCanvasWithTransform = (ctx, canvas, scale, offset) => {
  ctx.clearRect(
    -offset.x / scale,
    -offset.y / scale,
    canvas.width / scale,
    canvas.height / scale
  );
};

export const drawElements = (canvas, ctx, elements, drawElement) => {
  const rc = rough.canvas(canvas);
  elements.forEach((el) => drawElement(rc, ctx, el));
};

export const getMouseCoords = (e, canvasRef, offset, scale) => {
  const rect = canvasRef.current.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left - offset.x) / scale,
    y: (e.clientY - rect.top - offset.y) / scale,
  };
};

export function isInsideElement(pos, el) {
  if (el.type === "text") {
    const width = el.value.length * 8;
    const height = 20;
    return (
      pos.x >= el.x &&
      pos.x <= el.x + width &&
      pos.y >= el.y - height &&
      pos.y <= el.y
    );
  }

  const startX = el.start?.x ?? el.x;
  const endX = el.end?.x ?? el.x;
  const startY = el.start?.y ?? el.y;
  const endY = el.end?.y ?? el.y;

  const minX = Math.min(startX, endX);
  const maxX = Math.max(startX, endX);
  const minY = Math.min(startY, endY);
  const maxY = Math.max(startY, endY);

  return pos.x >= minX && pos.x <= maxX && pos.y >= minY && pos.y <= maxY;
}
