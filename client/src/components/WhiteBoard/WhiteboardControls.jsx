import { Button, Switch, Tooltip } from "@radix-ui/themes";
import { useState } from "react";
import "./WhiteboardControls.css";

function WhiteboardControls({
  setDarkTheme,
  darkTheme,
  setActiveTool,
  activeTool,
  setPencilColor,
  pencilColor,
}) {
  const [showShapeOptions, setShowShapeOptions] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);

  const handleShapeSelect = (shape) => {
    setActiveTool(shape);
    setShowShapeOptions(false);
    setShowColorOptions(false);
  };

  const handlePencilClick = () => {
    setActiveTool("pencil");
    setShowColorOptions(!showColorOptions);
    setShowShapeOptions(false);
  };

  const colors = [
    { name: "black", hex: "#000000" },
    { name: "white", hex: "#ffffff" },
    { name: "blue", hex: "#007bff" },
    { name: "green", hex: "#28a745" },
    { name: "purple", hex: "#6f42c1" },
    { name: "red", hex: "#dc3545" },
  ];

  return (
    <div className="whiteboard-container">
      <div className="toolbar">
        <Switch
          checked={darkTheme}
          onCheckedChange={(checked) => setDarkTheme(checked)}
          style={{ marginTop: "10px" }}
        />

        {/* Pencil Button */}
        <div className="custom-button pencil-wrapper">
          <Button
            onClick={handlePencilClick}
            className="custom-button pencil-button"
          >
            <Tooltip content="Pencil">
              <img
                src={
                  activeTool === "pencil"
                    ? "/images/icons/whiteboard/pencil.gif"
                    : "/images/icons/whiteboard/pencil-static.png"
                }
                alt="Pencil"
                className="pencil-icon"
              />
            </Tooltip>
          </Button>

          {showColorOptions && activeTool === "pencil" && (
            <div className="color-options">
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={`color-circle ${
                    pencilColor === color.hex ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => {
                    setPencilColor(color.hex);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Text Button */}
        <Button
          onClick={() => {
            setActiveTool("text");
            setShowColorOptions(false);
            setShowShapeOptions(false);
          }}
          className="custom-button text-button"
        >
          <Tooltip content="Text">
            <img
              src={
                activeTool === "text"
                  ? "/images/icons/whiteboard/text.gif"
                  : "/images/icons/whiteboard/text-static.png"
              }
              alt="Text"
              className="text-icon"
            />
          </Tooltip>
        </Button>

        {/* Shapes Dropdown */}
        <div className="custom-button shape-dropdown-wrapper">
          <Button
            onClick={() => {
              setShowShapeOptions(!showShapeOptions);
              setShowColorOptions(false);
            }}
            className="custom-button"
          >
            <Tooltip content="Shapes">
              <img
                src={
                  ["rectangle", "ellipse", "line"].includes(activeTool)
                    ? "/images/icons/whiteboard/shapes.gif"
                    : "/images/icons/whiteboard/shapes-static.png"
                }
                alt="Shapes"
                className="shapes-icon"
              />
            </Tooltip>
          </Button>

          {showShapeOptions && (
            <div className="shape-options">
              <button onClick={() => handleShapeSelect("rectangle")}>
                🟥 Rectangle
              </button>
              <button onClick={() => handleShapeSelect("ellipse")}>
                ⭕ Ellipse
              </button>
              <button onClick={() => handleShapeSelect("line")}>📏 Line</button>
            </div>
          )}
        </div>

        {/* Eraser Button */}
        <Button
          onClick={() => {
            setActiveTool("eraser");
            setShowColorOptions(false);
            setShowShapeOptions(false);
          }}
          className="custom-button"
        >
          <Tooltip content="Eraser">
            <img
              src={
                activeTool === "eraser"
                  ? "/images/icons/whiteboard/eraser.gif"
                  : "/images/icons/whiteboard/eraser-static.png"
              }
              alt="Eraser"
              className="eraser-icon"
            />
          </Tooltip>
        </Button>

        {/* Hand Button */}
        <Button
          onClick={() => {
            setActiveTool("hand");
            setShowColorOptions(false);
            setShowShapeOptions(false);
          }}
          className="custom-button"
        >
          <Tooltip content="Grab">
            <img
              src={
                activeTool === "hand"
                  ? "/images/icons/whiteboard/hand.gif"
                  : "/images/icons/whiteboard/hand-static.png"
              }
              alt="Hand"
              className="hand-icon"
            />
          </Tooltip>
        </Button>
      </div>
    </div>
  );
}

export default WhiteboardControls;
