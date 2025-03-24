import { v4 as uuid } from "uuid";

const rooms = [];

const handleSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on("createRoom", ({ username, roomName, roomPassword }) => {
      console.log(
        `${username}, wants to create a room with\nroom name: ${roomName}\npassword: ${roomPassword}`
      );

      const roomId = uuid();

      const newRoom = {
        roomId,
        roomPassword,
        roomName,
        owner: { socketId: socket.id, username },
        users: [{ socketId: socket.id, username }],
      };

      rooms.push(newRoom);
      console.log(rooms);
      socket.join(roomId);

      console.log(`room created by ${username} with id: ${roomId}`);
      socket.emit("roomCreated", roomId);
    });

    socket.on("getRoomInfo", ({roomId}) => {
      const room = rooms.find((room) => room.roomId === roomId);

      if (!room) {
        socket.emit("roomError", "room not found!");
        return;
      }

      socket.emit("roomInfo", room);
    })

    socket.on("disconnect", () => {
      console.log(`user disconnected: ${socket.id}`);

      rooms.forEach((room, index) => {
        room.users = room.users.filter((user) => user.socketId !== socket.id);
        if (room.users.length === 0) {
          rooms.splice(index, 1);
          console.log(`room ${room.roomId} deleted`);
        }
        console.log(rooms);
      });

      io.emit("roomList", rooms);
    });
  });
};

export default handleSocket;
