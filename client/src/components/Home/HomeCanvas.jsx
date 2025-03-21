import { useRef, useEffect } from "react";

function HomeCanvas() {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const colorOffset = useRef(0); // Store color offset in useRef

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawText = (x, y) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Generate dynamic colors (reddish, pinkish, purplish tones)
      const r = Math.floor(200 + 55 * Math.sin(colorOffset.current)); // Ranges from 200-255
      const g = Math.floor(50 + 30 * Math.sin(colorOffset.current + 2)); // Slight green tint (50-80)
      const b = Math.floor(150 + 105 * Math.sin(colorOffset.current + 4)); // Ranges from 150-255

      // Create a dynamic radial gradient
      const gradient = ctx.createRadialGradient(x, y, 50, x, y, 400);
      gradient.addColorStop(0, `rgb(${r}, ${g}, ${b})`); // Center color (main animation)
      gradient.addColorStop(0.4, `rgb(255, 100, 200)`); // Mid-tone pinkish
      gradient.addColorStop(1, `rgb(150, 50, 200)`); // Outer purple fade

      // Draw the text with animated color gradient
      ctx.fillStyle = gradient;
      ctx.font = "bold 11rem 'Noto Sans'";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText("Flow with Avani", canvas.width / 2, canvas.height / 2);
    };

    const animateColors = () => {
      colorOffset.current += 0.02; // Controls color change speed
      drawText(canvas.width / 2, canvas.height / 2);
      animationFrameId.current = requestAnimationFrame(animateColors);
    };

    const handleMouseMove = (e) => {
      drawText(e.clientX, e.clientY);
    };

    animateColors(); // Start color animation
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="gradientCanvas" />;
}

export default HomeCanvas;
