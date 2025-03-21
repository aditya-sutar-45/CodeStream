import { Box } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
// import rough from "roughjs";
import WhiteboardControls from "./WhiteboardControls";

function Whiteboard({ width, height }) {
  const canvasRef = useRef(null);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    // const rc = rough.canvas(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // rc.rectangle(10, 10, 100, 50, { roughness: 2, stroke: "blue" });
  }, [width, height]);

  return (
    <Box style={{ position: "relative", textAlign: "center" }}>
      <Box style={{ position: "absolute", width: "100%" }}>
        <WhiteboardControls setDarkTheme={setDarkTheme} />
      </Box>
      <canvas
        ref={canvasRef}
        style={{
          backgroundColor: darkTheme === true ? "black" : "white",
          border: "1px solid white",
          height: "100vh",
          overflow: "hidden",
          display: "block",
          width: "auto",
        }}
      />
    </Box>
  );
}

export default Whiteboard;
