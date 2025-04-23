import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditorPanel from "./CodeEditor/CodeEditorPanel";
import Whiteboard from "./WhiteBoard/Whiteboard";
import { useEffect, useState } from "react";
import socket from "../socket";
import { useNavigate, useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import { EVENTS } from "../utils/constants";
import toast from "react-hot-toast";
import { Box } from "@radix-ui/themes";
import ChatRoom from "./Chat/ChatRoom";

function Room() {
  const [room, setRoom] = useState(null);
  const [roomError, setRoomError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRoomInfo = (roomData) => setRoom(roomData);

    const handleRoomJoined = (username) => {
      toast(`${username} joined the room...`);
    };

    const handleRoomDeleted = () => {
      setRoom(null);
      navigate("/");
    };
    const handleRoomError = (errorMessage) => {
      toast.error(errorMessage);
      setRoomError(errorMessage);
    };
    const handleUserLeft = (user) => {
      toast(`${user.username} left the room!`);
    };
    const handleShutdown = () => {
      toast.error("server has shut down. you've been disconnected.");
      setRoom(null);
      navigate("/");
    };
    const handleUserDisconnect = () => {
      toast.error("lost connection to the server!");
      setRoom(null);
      navigate("/");
    };

    socket.emit(EVENTS.ROOM.GET_INFO, { roomId: id });

    socket.on(EVENTS.ROOM.JOINED, handleRoomJoined);
    socket.on(EVENTS.ROOM.INFO, handleRoomInfo);
    socket.on(EVENTS.ROOM.DELETED, handleRoomDeleted);
    socket.on(EVENTS.ROOM.ERROR, handleRoomError);
    socket.on(EVENTS.ROOM.LEFT, handleUserLeft);
    socket.on(EVENTS.SERVER.SHUTDOWN, handleShutdown);
    socket.on(EVENTS.USER.DISCONNECT, handleUserDisconnect);

    return () => {
      socket.off(EVENTS.ROOM.JOINED, handleRoomJoined);
      socket.off(EVENTS.ROOM.INFO, handleRoomInfo);
      socket.off(EVENTS.ROOM.DELETED, handleRoomDeleted);
      socket.off(EVENTS.ROOM.ERROR, handleRoomError);
      socket.off(EVENTS.ROOM.LEFT, handleUserLeft);
      socket.off(EVENTS.SERVER.SHUTDOWN, handleShutdown);
      socket.off(EVENTS.USER.DISCONNECT, handleUserDisconnect);
    };
  }, [id, navigate]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.disconnect(); // optional
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  if (roomError) return <NotFoundPage />;
  if (!room) return <p>Loading.....</p>;

  return (
    <Box style={{ position: "relative", height: "100vh" }}>
      <PanelGroup direction="horizontal">
        <Panel defaultSize={100} maxSize={100}>
          <CodeEditorPanel room={room} roomError={roomError} />
        </Panel>
        <PanelResizeHandle style={{ padding: "3px" }} />
        <Panel defaultSize={0} maxSize={75}>
          <Whiteboard roomId={room.roomId} />
        </Panel>
      </PanelGroup>

      <ChatRoom roomId={room.roomId} />
    </Box>
  );
}

export default Room;
