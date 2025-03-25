import { Box } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import WhiteboardControls from "./WhiteboardControls";

function Whiteboard({ width, height }) {
  const canvasRef = useRef(null);
  const [darkTheme, setDarkTheme] = useState(false); // ✅ Manages theme state

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [width, height]);

  return (
    <Box
      style={{
        position: "relative",
        textAlign: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: darkTheme ? "black" : "white", // ✅ Applies dark mode
        transition: "background 0.3s ease-in-out",
      }}
    >
      {/* ✅ Pass darkTheme state to WhiteboardControls */}
      <WhiteboardControls setDarkTheme={setDarkTheme} darkTheme={darkTheme} />

      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid white",
          width: "100%",
          height: "100vh",
          display: "block",
        }}
      />
    </Box>
  );
}

export default Whiteboard;
