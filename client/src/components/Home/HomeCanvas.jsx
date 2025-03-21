import { useRef, useEffect } from "react";

function HomeCanvas() {
  const canvasRef = useRef(null);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawText = (x, y) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient creation
      const gradient = ctx.createRadialGradient(x, y, 50, x, y, 400);
      gradient.addColorStop(0, "#ff5847"); // Center color
      gradient.addColorStop(0.4, "#d699fb"); // Mid color
      gradient.addColorStop(1, "#9177ff"); // Outer fade

      // Draw the text
      ctx.fillStyle = gradient;
      ctx.font = "bold 12.5rem 'Noto Sans'";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Flow with Code", canvas.width / 2, canvas.height / 2);
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      drawText(x, y);
    };

    // Initial render and event listener
    drawText(canvas.width / 2, canvas.height / 2);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup to avoid memory leaks
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }

  useEffect(() => {
    initCanvas();
  }, []);

    return (
      <canvas ref={canvasRef} className="gradientCanvas" />
    );
}

export default HomeCanvas;