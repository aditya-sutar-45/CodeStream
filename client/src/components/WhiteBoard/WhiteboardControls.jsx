import {
  Box,
  Text,
  Button,
  Flex,
  Slider,
  Switch,
  HoverCard,
} from "@radix-ui/themes";
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
  pencilStrokeWidth,
  setPencileStrokeWidth,
  shapeStrokeWidth,
  setShapeStrokeWidth,
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
          iconClass=" icon"
        />

        {/* Pencil Tool */}
        <Box>
          <HoverCard.Root>
            <HoverCard.Trigger>
              <Button onClick={handlePencilClick} className="custom-button">
                <img
                  src={
                    activeTool === "pencil"
                      ? `/images/icons/whiteboard/pencil.gif`
                      : `/images/icons/whiteboard/pencil-static.png`
                  }
                  className="icon"
                  alt={"pencil"}
                />
              </Button>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <Box width="100%">
                <Text>Thickness: {pencilStrokeWidth}</Text>
                <Slider
                  defaultValue={[pencilStrokeWidth]}
                  min={1}
                  max={9}
                  step={2}
                  onValueChange={([value]) => setPencileStrokeWidth(value)}
                />
              </Box>
              {COLORS.map(({ name, hex }) => (
                <button
                  key={name}
                  className={`color-circle ${pencilColor === hex ? "selected" : ""
                    }`}
                  style={{ backgroundColor: hex }}
                  onClick={() => setPencilColor(hex)}
                />
              ))}
            </HoverCard.Content>
          </HoverCard.Root>
        </Box>

        {/* Text Tool */}
        <ToolButton
          tool="text"
          activeTool={activeTool}
          onClick={() => handleToolClick("text")}
          tooltip="Text"
          iconClass="text-icon"
        />

        {/* Shape Dropdown */}
        <Box>
          <HoverCard.Root>
            <HoverCard.Trigger>
              <Button onClick={handlePencilClick} className="custom-button">
                <img
                  src={
                    activeTool === "pencil"
                      ? `/images/icons/whiteboard/shapes.gif`
                      : `/images/icons/whiteboard/shapes-static.png`
                  }
                  className="icon"
                  alt={"pencil"}
                />
              </Button>
            </HoverCard.Trigger>
            <HoverCard.Content>
              <Box width="100%">
                <Text>Thickness: {shapeStrokeWidth}</Text>
                <Slider
                  defaultValue={[shapeStrokeWidth]}
                  min={1}
                  max={9}
                  step={2}
                  onValueChange={([value]) => setShapeStrokeWidth(value)}
                />
              </Box>
              {SHAPES.map(({ name, label }) => (
                <Button key={name} onClick={() => handleToolClick(name)}>
                  {label}
                </Button>
              ))}
            </HoverCard.Content>
          </HoverCard.Root>
        </Box>

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
