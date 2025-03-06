import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditorPanel from "./CodeEditor/CodeEditorPanel";
import Whiteboard from "./WhiteBoard/Whiteboard";
import { useState } from "react";

function Room() {
  const [whiteBoardSize, setWhiteBoardSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={100} maxSize={100}>
        <CodeEditorPanel />
      </Panel>
      <PanelResizeHandle
        style={{ padding: "3px" }}
      />
      <Panel
        defaultSize={0}
        maxSize={75}
        onLayout={(width, height) => setWhiteBoardSize({ width, height })}
      >
        <Whiteboard
          width={whiteBoardSize.width}
          height={whiteBoardSize.height}
        />
      </Panel>
    </PanelGroup>
  );
}

export default Room;
