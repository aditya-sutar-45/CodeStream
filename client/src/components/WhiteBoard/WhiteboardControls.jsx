import {
  Box,
  Text,
  Button,
  Flex,
  Slider,
  Switch,
  HoverCard,
  IconButton,
} from "@radix-ui/themes";
import "./WhiteboardControls.css";
import ToolButton from "./ToolButton";
import { CircleIcon, SlashIcon, SquareIcon } from "@radix-ui/react-icons";

const SHAPES = [
  { name: "rectangle", label: <SquareIcon /> },
  { name: "ellipse", label: <CircleIcon /> },
  { name: "line", label: <SlashIcon /> },
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
  shapeColor,
  setShapeColor,
  pencilStrokeWidth,
  setPencileStrokeWidth,
  shapeStrokeWidth,
  setShapeStrokeWidth,
}) {
  const handleToolClick = (tool) => {
    setActiveTool(tool);
  };

  const handlePencilClick = () => {
    setActiveTool("pencil");
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
              <Button
                onClick={handlePencilClick}
                style={{
                  background: activeTool === "pencil" ? "gray" : "#6a0dad",
                }}
                className="custom-button"
              >
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
                  className={`color-circle ${
                    pencilColor === hex ? "selected" : ""
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
              <Button
                className="custom-button"
                style={{
                  backgroundColor:
                    activeTool === "rectangle" ||
                    activeTool === "ellipse" ||
                    activeTool === "line"
                      ? "gray"
                      : "#6a0dad",
                }}
              >
                <img
                  src={
                    activeTool === "shapes"
                      ? `/images/icons/whiteboard/shapes.gif`
                      : `/images/icons/whiteboard/shapes-static.png`
                  }
                  className="icon"
                  alt={"pencil"}
                />
              </Button>
            </HoverCard.Trigger>
            <HoverCard.Content>
              {SHAPES.map(({ name, label }) => (
                <IconButton
                  key={name}
                  mx="1"
                  onClick={() => handleToolClick(name)}
                  style={{
                    backgroundColor: activeTool === name ? "gray" : "#6a0dad",
                  }}
                >
                  {label}
                </IconButton>
              ))}
              <Box width="100%" my="2">
                <Text>Thickness: {shapeStrokeWidth}</Text>
                <Slider
                  defaultValue={[shapeStrokeWidth]}
                  min={1}
                  max={9}
                  step={2}
                  onValueChange={([value]) => setShapeStrokeWidth(value)}
                />
              </Box>
              {COLORS.map(({ name, hex }) => (
                <button
                  key={name}
                  className={`color-circle ${
                    shapeColor === hex ? "selected" : ""
                  }`}
                  style={{ backgroundColor: hex }}
                  onClick={() => setShapeColor(hex)}
                />
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
