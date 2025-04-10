import { Tooltip, Button } from "@radix-ui/themes";

const TOOL_ICONS = {
  pencil: "pencil",
  text: "text",
  rectangle: "shapes",
  ellipse: "shapes",
  line: "shapes",
  eraser: "eraser",
  hand: "hand",
  select: "select",
};

function ToolButton({ tool, activeTool, onClick, tooltip, iconClass }) {
  return (
    <Tooltip content={tooltip}>
      <Button
        onClick={onClick}
        className="custom-button"
        style={{
          background: activeTool === tool ? "gray" : "#6a0dad",
        }}
      >
        <img
          src={
            activeTool === tool
              ? `/images/icons/whiteboard/${TOOL_ICONS[tool]}.gif`
              : `/images/icons/whiteboard/${TOOL_ICONS[tool]}-static.png`
          }
          alt={tool}
          className={iconClass}
        />
      </Button>
    </Tooltip>
  );
}

export default ToolButton;
