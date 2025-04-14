import {
  Box,
  Text,
  Button,
  Flex,
  Slider,
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
        // width="40vw"
        p="2"
        className="toolbar"
      >
        <Button
          onClick={() => setDarkTheme(!darkTheme)}
          className="custom-button"
        >
          {darkTheme ? (
            // Show Sun icon in dark mode
            <svg
              id="sun-icon"
              className="icon sun"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            // Show Moon icon in light mode
            <svg
              id="moon-icon"
              className="icon moon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </Button>

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
                  background: "#6a0dad",
                  border: activeTool === "pencil" ? "2px solid white" : "none",
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
            <HoverCard.Content className="hover-card-content">
              <div className="tool-options">
                {/* Thickness Label */}
                <Text className="pencil-label">
                  Thickness: {pencilStrokeWidth}
                </Text>

                {/* Slider */}
                <Slider
                  defaultValue={[pencilStrokeWidth]}
                  min={1}
                  max={9}
                  step={2}
                  onValueChange={([value]) => setPencileStrokeWidth(value)}
                  className="slider"
                />

                {/* Color Circles */}
                <div className="color-row">
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
              </div>
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
                  backgroundColor: "#6a0dad",
                  border:
                    activeTool === "rectangle" ||
                    activeTool === "ellipse" ||
                    activeTool === "line"
                      ? "2px solid white"
                      : "none",
                }}
                onClick={() => handleToolClick("rectangle")}
              >
                <img
                  src={
                    activeTool === "shapes"
                      ? `/images/icons/whiteboard/shapes.gif`
                      : `/images/icons/whiteboard/shapes-static.png`
                  }
                  className="icon"
                  alt={"shapes"}
                />
              </Button>
            </HoverCard.Trigger>

            <HoverCard.Content className="shapes-content">
              {/* Shapes Selection */}
              <Box className="shapes-selection">
                {SHAPES.map(({ name, label }) => (
                  <IconButton
                    key={name}
                    onClick={() => handleToolClick(name)}
                    style={{
                      backgroundColor: activeTool === name ? "gray" : "#6a0dad",
                    }}
                  >
                    {label}
                  </IconButton>
                ))}
              </Box>

              {/* Stroke Thickness */}
              <Box className="tool-options">
                <Text className="thickness-label">
                  Thickness: {shapeStrokeWidth}
                </Text>
                <Slider
                  defaultValue={[shapeStrokeWidth]}
                  min={1}
                  max={9}
                  step={2}
                  onValueChange={([value]) => setShapeStrokeWidth(value)}
                />
              </Box>

              {/* Color Circles */}
              <Box className="color-row">
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
              </Box>
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
