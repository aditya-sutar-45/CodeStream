import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditorPanel from "./CodeEditor/CodeEditorPanel";
import Whiteboard from "./WhiteBoard/Whiteboard";
import { useEffect, useState } from "react";
import socket from "../socket";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { EVENTS } from "../utils/constants";

function Room() {
  const [room, setRoom] = useState(null);
  const [roomError, setRoomError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    socket.emit(EVENTS.ROOM.GET_INFO, { roomId: id });

    socket.on(EVENTS.ROOM.INFO, (roomData) => {
      setRoom(roomData);
    });

    socket.on(EVENTS.ROOM.ERROR, (errorMessage) => {
      setRoomError(errorMessage);
    });

    return () => {
      socket.off(EVENTS.ROOM.INFO);
      socket.off(EVENTS.ROOM.ERROR);
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
