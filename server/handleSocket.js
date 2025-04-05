import {
  getRoomInfo,
  handleCodeSync,
  handleCreateRoom,
  handleDisconnect,
  handleJoinRoom,
  handleLanguageSync,
  handleLeaveRoom,
  handleShutdown,
} from "./controllers/rooms.js";
import { EVENTS } from "./utils/constants.js";

const rooms = [];

const handleSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on(EVENTS.ROOM.CREATE, async (data) =>
      handleCreateRoom(socket, rooms, data)
    );

    socket.on(EVENTS.ROOM.JOIN, async (data) =>
      handleJoinRoom(socket, rooms, data)
    );

    socket.on(EVENTS.ROOM.GET_INFO, ({ roomId }) =>
      getRoomInfo(socket, roomId, rooms)
    );

    socket.on(EVENTS.ROOM.LEAVE, (roomId, callback) =>
      handleLeaveRoom(socket, rooms, roomId, io, callback)
    );

    socket.on(EVENTS.USER.DISCONNECT, () =>
      handleDisconnect(socket, rooms, io)
    );

    socket.on(EVENTS.CODE.SYNC, (data) => handleCodeSync(socket, rooms, data));

    socket.on(EVENTS.CODE.LANUGAGE_CHANGE, (data) =>
      handleLanguageSync(socket, rooms, data)
    );
  });

  process.on("SIGINT", () => handleShutdown(io, rooms));
  process.on("SIGTERM", () => handleShutdown(io, rooms));
};

export default handleSocket;
