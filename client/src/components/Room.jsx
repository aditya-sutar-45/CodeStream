import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditorPanel from "./CodeEditor/CodeEditorPanel";
import Whiteboard from "./WhiteBoard/Whiteboard";
import { useEffect, useState } from "react";
import socket from "../socket";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";

function Room() {
  const [room, setRoom] = useState(null);
  const [roomError, setRoomError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    socket.emit("getRoomInfo", { roomId: id });

    socket.on("roomInfo", (roomData) => {
      setRoom(roomData);
    });

    socket.on("roomError", (errorMessage) => {
      setRoomError(errorMessage);
    });

    return () => {
      socket.off("roomInfo");
      socket.off("roomError");
    };
  }, [id]);

  const [whiteBoardSize, setWhiteBoardSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  if (roomError) return <NotFoundPage />;
  if (!room) return <p>Loading.....</p>;

  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={100} maxSize={100}>
        <CodeEditorPanel room={room} roomError={roomError} />
      </Panel>
      <PanelResizeHandle style={{ padding: "3px" }} />
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
