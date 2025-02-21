import { useEffect, useRef } from "react";
import rough from "roughjs";

function WhiteBaord() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rc = rough.canvas(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rc.rectangle(50, 50, 200, 100, { roughness: 2, stroke: "blue" });
    rc.circle(300, 100, 50, {
      roughness: 1,
      stroke: "red",
      fill: "yellow",
      fillStyle: "solid",
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      style={{ backgroundColor: "white", border: "1px solid white" }}
    />
  );
}

export default WhiteBaord;
