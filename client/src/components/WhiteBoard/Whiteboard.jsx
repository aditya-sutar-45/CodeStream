import { useEffect } from "react";
import { useRef } from "react";

function WhiteBaord() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (!canvasRef.current) return;

  }, [canvasRef]);

  return (
    <>
    <canvas height="720px" width="1280px" ref={canvasRef}/>
    </>
  );
}

export default WhiteBaord;
