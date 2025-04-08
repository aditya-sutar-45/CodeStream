import { Button, Flex, Switch } from "@radix-ui/themes";
import { useState } from "react";
import "./WhiteboardControls.css";
import ToolButton from "./ToolButton";

const SHAPES = [
  { name: "rectangle", label: "Rectangle" },
  { name: "ellipse", label: "Ellipse" },
  { name: "line", label: "Line" },
];

const COLORS = [
  { name: "black", hex: "#000000" },
  { name: "white", hex: "#ffffff" },
  { name: "blue", hex: "#007bff" },
  { name: "green", hex: "#28a745" },
  { name: "purple", hex: "#6f42c1" },
  { name: "red", hex: "#dc3545" },
];

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

  const handleToolClick = (tool) => {
    setActiveTool(tool);
    setShowShapeOptions(false);
    setShowColorOptions(false);
  };

  const handlePencilClick = () => {
    setActiveTool("pencil");
    setShowColorOptions(!showColorOptions);
    setShowShapeOptions(false);
  };

  const handleShapeToggle = () => {
    setShowShapeOptions(!showShapeOptions);
    setShowColorOptions(false);
  };

  return (
    <Flex
      width="100%"
      justify="center"
      align="center"
      className="whiteboard-container"
    >
      <Flex
        position="absolute"
        justify="center"
        align="center"
        gap="1"
        height="8vh"
        width="30vw"
        className="toolbar"
      >
        <Switch checked={darkTheme} onCheckedChange={setDarkTheme} />
        {/* Select Tool */}
        <ToolButton
          tool="select"
          activeTool={activeTool}
          onClick={() => handleToolClick("select")}
          tooltip="Select"
          iconClass="select-icon"
        />

        {/* Pencil Tool */}
        <div className="pencil-wrapper">
          <ToolButton
            tool="pencil"
            activeTool={activeTool}
            onClick={handlePencilClick}
            tooltip="Pencil"
            iconClass="icon"
          />
          {showColorOptions && activeTool === "pencil" && (
            <div className="color-options">
              {COLORS.map(({ name, hex }) => (
                <button
                  key={name}
                  className={`color-circle ${
                    pencilColor === hex ? "selected" : ""
                  }`}
                  style={{ backgroundColor: hex }}
                  onClick={() => setPencilColor(hex)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Text Tool */}
        <ToolButton
          tool="text"
          activeTool={activeTool}
          onClick={() => handleToolClick("text")}
          tooltip="Text"
          iconClass="text-icon"
        />

        {/* Shape Dropdown */}
        <div className="custom-button shape-dropdown-wrapper">
          <ToolButton
            tool="rectangle"
            activeTool={activeTool}
            onClick={handleShapeToggle}
            tooltip="Shapes"
            iconClass="shapes-icon"
          />
          {showShapeOptions && (
            <Flex direction="column" gap="1" mt="1">
              {SHAPES.map(({ name, label }) => (
                <Button key={name} onClick={() => handleToolClick(name)}>
                  {label}
                </Button>
              ))}
            </Flex>
          )}
        </div>

        {/* Eraser Tool */}
        <ToolButton
          tool="eraser"
          activeTool={activeTool}
          onClick={() => handleToolClick("eraser")}
          tooltip="Eraser"
          iconClass="eraser-icon"
        />

        {/* Hand Tool */}
        <ToolButton
          tool="hand"
          activeTool={activeTool}
          onClick={() => handleToolClick("hand")}
          tooltip="Grab"
          iconClass="hand-icon"
        />
      </Flex>
    </Flex>
  );
}

export default WhiteboardControls;
