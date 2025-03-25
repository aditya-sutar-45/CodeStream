import {
  getRoomInfo,
  handleCreateRoom,
  handleDisconnect,
  handleJoinRoom,
} from "./controllers/rooms.js";

const rooms = [];

const handleSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on("createRoom", (data) => {
      handleCreateRoom(socket, rooms, data);
    });

    socket.on("joinRoom", (data) => {
      handleJoinRoom(socket, rooms, data);
    });

    socket.on("getRoomInfo", ({ roomId }) => {
      getRoomInfo(socket, roomId, rooms);
    });

    socket.on("disconnect", () => {
      handleDisconnect(socket, rooms, io);
    });
  });
};

export default handleSocket;
