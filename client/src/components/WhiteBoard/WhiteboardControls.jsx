import { useState } from "react";
import { Button, Switch } from "@radix-ui/themes";
import "./WhiteboardControls.css";

function WhiteboardControls({ setDarkTheme }) {
  const [darkTheme, setDarkThemeState] = useState(false); // Define theme state
  const [zoomLevel, setZoomLevel] = useState(100);
  const [activeTool, setActiveTool] = useState(null);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 300));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 10));
  };

  return (
    <div className="whiteboard-container">
      {/* Toolbar at the top */}
      <div className="toolbar">
        <Switch
          checked={darkTheme} // Uses correct boolean value
          onCheckedChange={(checked) => {
            setDarkThemeState(checked); // Update internal state
            setDarkTheme(checked); // Also update external theme state
          }}
          style={{ marginTop: "10px" }}
        />

        {/* Pencil Button */}
        <Button
          onMouseEnter={() => setActiveTool("pencil")}
          onMouseLeave={() => setActiveTool(null)}
          onClick={() => setActiveTool("pencil")}
          className="custom-button pencil-button"
        >
          <img
            src={activeTool === "pencil" ? "/images/icons/whiteboard/pencil.gif" : "/images/icons/whiteboard/pencil-static.png"}
            alt="Pencil"
            className="pencil-icon"
          />
          <div className="tooltip">Draw Tool</div> {/* Tooltip added here */}
        </Button>

        {/* Text Button */}
        <Button
          onMouseEnter={() => setActiveTool("text")}
          onMouseLeave={() => setActiveTool(null)}
          onClick={() => setActiveTool("text")}
          className="custom-button text-button"
        >
          <img
            src={activeTool === "text" ? "/images/icons/whiteboard/text.gif" : "/images/icons/whiteboard/text-static.png"}
            alt="Text"
            className="text-icon"
          />
          <div className="tooltip">Text Tool</div>

        </Button>

        {/* Shapes Button */}
        <Button
          onMouseEnter={() => setActiveTool("shapes")}
          onMouseLeave={() => setActiveTool(null)}
          onClick={() => setActiveTool("shapes")}
          className="custom-button"
        >
          <img
            src={activeTool === "shapes" ? "/images/icons/whiteboard/shapes.gif" : "/images/icons/whiteboard/shapes-static.png"}
            alt="Shapes"
            className="shapes-icon"
          />
        </Button>

        {/* Eraser Button */}
        <Button
          onMouseEnter={() => setActiveTool("eraser")}
          onMouseLeave={() => setActiveTool(null)}
          onClick={() => setActiveTool("eraser")}
          className="custom-button"
        >
          <img
            src={activeTool === "eraser" ? "/images/icons/whiteboard/eraser.gif" : "/images/icons/whiteboard/eraser-static.png"}
            alt="Eraser"
            className="eraser-icon"
          />
        </Button>
          {/* hand icon */}
        <Button
          onMouseEnter={() => setActiveTool("hand")}
          onMouseLeave={() => setActiveTool(null)}
          onClick={() => setActiveTool("hand")}
          className="custom-button"
        >
          <img
            src={activeTool === "hand" ? "/images/icons/whiteboard/hand.gif" : "/images/icons/whiteboard/hand-static.png"}
            alt="hand"
            className="hand-icon"
          />
        </Button>
      </div>

      {/* Zoom Controls */}
      <div className="zoom-controls">
        <Button onClick={handleZoomOut} className="custom-button">
          −
        </Button>
        <span className="zoom-percentage">{zoomLevel}%</span>
        <Button onClick={handleZoomIn} className="custom-button">
          +
        </Button>
      </div>
    </div>
  );
}

export default WhiteboardControls;
