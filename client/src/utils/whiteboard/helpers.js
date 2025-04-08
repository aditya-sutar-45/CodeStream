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
};

export const drawLine = (rc, el) => {
  rc.line(el.start.x, el.start.y, el.end.x, el.end.y);
};

export const drawRectangle = (rc, el) => {
  rc.rectangle(
    el.start.x,
    el.start.y,
    el.end.x - el.start.x,
    el.end.y - el.start.y
  );
};

export const drawEllipse = (rc, el) => {
  rc.ellipse(
    (el.start.x + el.end.x) / 2,
    (el.start.y + el.end.y) / 2,
    Math.abs(el.end.x - el.start.x),
    Math.abs(el.end.y - el.start.y)
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

export const drawElements = (rough, canvas, ctx, elements, drawElement) => {
  const rc = rough.canvas(canvas);
  elements.forEach((el) => drawElement(rc, ctx, el));
};

