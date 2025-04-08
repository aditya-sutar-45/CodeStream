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

export const drawLine = (rc, el, isSelected = false) => {
  rc.line(el.start.x, el.start.y, el.end.x, el.end.y, {
    ...el.options,
  });

  if (isSelected) {
    const ctx = rc.canvas.getContext("2d");
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 2]);
    ctx.beginPath();
    ctx.moveTo(el.start.x, el.start.y);
    ctx.lineTo(el.end.x, el.end.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }
};

export const drawRectangle = (rc, el, isSelected = false) => {
  rc.rectangle(
    el.start.x,
    el.start.y,
    el.end.x - el.start.x,
    el.end.y - el.start.y,
    el.options
  );

  if (isSelected) {
    const ctx = rc.canvas.getContext("2d");
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 2]);
    ctx.strokeRect(
      el.start.x,
      el.start.y,
      el.end.x - el.start.x,
      el.end.y - el.start.y
    );
    ctx.setLineDash([]);
    ctx.restore();
  }
};

export const drawEllipse = (rc, el, isSelected = false) => {
  const centerX = (el.start.x + el.end.x) / 2;
  const centerY = (el.start.y + el.end.y) / 2;
  const width = Math.abs(el.end.x - el.start.x);
  const height = Math.abs(el.end.y - el.start.y);

  rc.ellipse(centerX, centerY, width, height, el.options);

  if (isSelected) {
    const ctx = rc.canvas.getContext("2d");
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 2]);
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }
};

export const drawText = (ctx, el, darkTheme, isSelected = false) => {
  ctx.fillStyle = darkTheme ? "white" : "black";
  ctx.font = "20px Arial";
  ctx.fillText(el.value, el.x, el.y);

  if (isSelected) {
    const textMetrics = ctx.measureText(el.value);
    const padding = 4;
    const height = 24; // rough approximation of 20px font height
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 2]);
    ctx.strokeRect(
      el.x - padding,
      el.y - height + padding,
      textMetrics.width + 2 * padding,
      height
    );
    ctx.setLineDash([]);
    ctx.restore();
  }
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

export const drawElements = (canvas, ctx, elements, drawFn) => {
  const rc = rough.canvas(canvas);
  elements.forEach((el, index) => drawFn(rc, ctx, el, index));
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
