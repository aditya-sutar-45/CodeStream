import { v4 as uuid } from "uuid";

export const handleCreateRoom = (
  socket,
  rooms,
  { username, roomName, roomPassword }
) => {
  console.log(
    `${username}, wants to create a room with\nroom name: ${roomName}\npassword: ${roomPassword}`
  );

  const exisitingRoom = rooms.find((room) => room.owner.username === username);
  console.log(exisitingRoom);
  if (exisitingRoom) {
    socket.emit("roomError", "you are already hosting a room");
    return;
  }

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
};

export const getRoomInfo = (socket, roomId, rooms) => {
  const room = rooms.find((room) => room.roomId === roomId);

  if (!room) {
    socket.emit("roomError", "room not found!");
    return;
  }

  socket.emit("roomInfo", room);
};

export const handleDisconnect = (socket, rooms, io) => {
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
};
