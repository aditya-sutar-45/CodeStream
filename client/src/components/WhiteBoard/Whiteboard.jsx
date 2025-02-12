import * as fabric from "fabric";
import { useEffect } from "react";
import { useRef } from "react";

function WhiteBaord() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "white",
    });

    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      opacity: 0,
      width: 100,
      height: 100,
    });

    canvas.add(rect);

    return () => {
      canvas.dispose();
    };
  }, [canvasRef]);

  return (
    <>
    <canvas height="720px" width="1280px" ref={canvasRef}/>
    </>
  );
}

export default WhiteBaord;
