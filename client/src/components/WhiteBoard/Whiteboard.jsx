import { useEffect, useRef } from "react";
import rough from "roughjs";

function Whiteboard({width, height}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    const rc = rough.canvas(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rc.rectangle(10, 10, 100, 50, { roughness: 2, stroke: "blue" });
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      style={{ backgroundColor: "white", border: "1px solid white", height: "100vh", width: "auto" }}
    />
  );
}

export default Whiteboard;
