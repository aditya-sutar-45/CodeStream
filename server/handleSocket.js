import {
  getRoomInfo,
  handleCreateRoom,
  handleDisconnect,
  handleJoinRoom,
  handleLeaveRoom,
} from "./controllers/rooms.js";
import { EVENTS } from "./utils/constants.js";

const rooms = [];

const handleSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on(EVENTS.ROOM.CREATE, (data) =>
      handleCreateRoom(socket, rooms, data)
    );

    socket.on(EVENTS.ROOM.JOIN, (data) => handleJoinRoom(socket, rooms, data));

    socket.on(EVENTS.ROOM.GET_INFO, ({ roomId }) =>
      getRoomInfo(socket, roomId, rooms)
    );

    socket.on(EVENTS.ROOM.LEAVE, (roomId, callback) =>
      handleLeaveRoom(socket, rooms, roomId, io, callback)
    );

    socket.on(EVENTS.USER.DISCONNECT, () =>
      handleDisconnect(socket, rooms, io)
    );
  });
};

export default handleSocket;
