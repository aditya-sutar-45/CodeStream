import { v4 as uuid } from "uuid";
import { EVENTS } from "../utils/constants.js";

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
    socket.emit(EVENTS.ROOM.ERROR, "you are already hosting a room");
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
  socket.emit(EVENTS.ROOM.CREATED, roomId);
};

export const handleJoinRoom = (
  socket,
  rooms,
  { username, roomId, roomPassword }
) => {
  console.log(
    `${username}, wants to join a room with\nroom id: ${roomId}\npassword: ${roomPassword}`
  );

  const exisitingRoom = rooms.find((room) => room.roomId === roomId);
  if (!exisitingRoom) {
    socket.emit(EVENTS.ROOM.ERROR, `room with ${roomId} does not exist`);
    return;
  }

  if (roomPassword !== exisitingRoom.roomPassword) {
    socket.emit(EVENTS.ROOM.ERROR, "Incorrect roomId/ password");
    return;
  }

  const userAlreadyInRoom = exisitingRoom.users.some(
    (user) => user.username === username
  );
  if (userAlreadyInRoom) {
    socket.emit(EVENTS.ROOM.ERROR, "you have already joined this room");
    return;
  }

  socket.join(roomId);
  exisitingRoom.users.push({ socketId: socket.id, username });

  socket.emit(EVENTS.ROOM.JOINED, roomId);
  socket.to(roomId).emit(EVENTS.ROOM.INFO, exisitingRoom);
};

export const getRoomInfo = (socket, roomId, rooms) => {
  const room = rooms.find((room) => room.roomId === roomId);

  if (!room) {
    socket.emit(EVENTS.ROOM.ERROR, "room not found!");
    return;
  }

  socket.emit(EVENTS.ROOM.INFO, room);
};

export const handleLeaveRoom = (socket, rooms, roomId, io, callback) => {
  console.log(`user leaving: ${socket.id}`);

  const roomIndex = rooms.findIndex((room) => room.roomId === roomId);
  if (roomIndex === -1) return;
  const room = rooms[roomIndex];

  const userIndex = room.users.findIndex((user) => user.socketId === socket.id);
  if (userIndex === -1) return;

  // removing users
  room.users.splice(userIndex, 1);

  if (room.users.length === 0) {
    console.log(`rooms ${roomId} deleted`);
    rooms.splice(roomIndex, 1);
  } else {
    io.to(room.roomId).emit(EVENTS.ROOM.INFO, room);
  }

  socket.leave(room.roomId);
  console.log(rooms);
  socket.emit(EVENTS.ROOM.LEFT, roomId);
  console.log(`user: ${socket.id} left the room`);

  if (callback) callback();
};

export const handleDisconnect = (socket, rooms, io) => {
  console.log(`user disconnected: ${socket.id}`);

  rooms.forEach((room, index) => {
    room.users = room.users.filter((user) => user.socketId !== socket.id);
    if (room.users.length === 0) {
      rooms.splice(index, 1);
      console.log(`room ${room.roomId} deleted`);
    } else {
      io.to(room.roomId).emit(EVENTS.ROOM.INFO, room);
    }
    console.log(rooms);
  });
};
