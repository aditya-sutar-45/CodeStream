import { Button, Switch } from "@radix-ui/themes";
import {
  EraserIcon,
  Pencil1Icon,
  SquareIcon,
  TextIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "@radix-ui/react-icons";

function WhiteboardControls({ setDarkTheme }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Toolbar at the top */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#333", // Solid dark background
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <Switch
          onCheckedChange={() => {
            setDarkTheme((currentTheme) => !currentTheme);
          }}
        />
        <Button>
          <Pencil1Icon />
        </Button>

        <Button mx="1">
          <TextIcon />
        </Button>

        <Button>
          <SquareIcon />
        </Button>

        <Button mx="1">
          <EraserIcon />
        </Button>
      </div>

      {/* Zoom controls at bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          background: "#333", // Solid dark background
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <Button>
          <ZoomInIcon />
        </Button>
        <Button>
          <ZoomOutIcon />
        </Button>
      </div>
    </div>
  );
}

export default WhiteboardControls;
