import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditorPanel from "./CodeEditor/CodeEditorPanel";
import Whiteboard from "./WhiteBoard/Whiteboard";
import { useEffect, useState } from "react";
import socket from "../socket";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { EVENTS } from "../utils/constants";
import toast from "react-hot-toast";

function Room() {
  const [room, setRoom] = useState(null);
  const [roomError, setRoomError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit(EVENTS.ROOM.GET_INFO, { roomId: id });

    socket.on(EVENTS.ROOM.INFO, (roomData) => {
      setRoom(roomData);
    });

    socket.on(EVENTS.ROOM.DELETED, () => {
      console.log("room deleted");
      setRoom(null);
      navigate("/");
    });

    socket.on(EVENTS.ROOM.ERROR, (errorMessage) => {
      toast.error(errorMessage);
      setRoomError(errorMessage);
    });

    socket.on(EVENTS.SERVER.SHUTDOWN, () => {
      toast.error("server has shut down. you've been disconnected.");
      setRoom(null);
      navigate("/");
    });

    socket.on(EVENTS.USER.DISCONNECT, () => {
      toast.error("lost connection to the server!");
      setRoom(null);
      navigate("/");
    });

    return () => {
      socket.off(EVENTS.ROOM.INFO);
      socket.off(EVENTS.ROOM.ERROR);
      socket.off(EVENTS.ROOM.DELETED);
      socket.off(EVENTS.SERVER.SHUTDOWN);
      socket.off(EVENTS.USER.DISCONNECT);
    };
  }, [id, navigate]);

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
