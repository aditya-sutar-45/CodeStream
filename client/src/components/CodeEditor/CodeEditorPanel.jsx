import { Box } from "@radix-ui/themes";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function CodeEditorPanel() {
  return (
    <Box height="100vh" width="100%">
      <PanelGroup direction="vertical">
        <Panel defaultSize={50} maxSize={75}>
          <Box
            style={{ height: "100%", background: "#282c34", color: "white" }}
          >
            Top Panel
          </Box>
        </Panel>

        <PanelResizeHandle />

        <Panel defaultSize={50} maxSize={75}>
          <Box
            style={{
              height: "100%",
              background: "#3c4048",
              color: "white",
            }}
          >
            Bottom Panel
          </Box>
        </Panel>
      </PanelGroup>
    </Box>
  );
}

export default CodeEditorPanel;
