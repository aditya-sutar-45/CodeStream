const handleSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`);

    socket.on("createRoom", ({ username, roomName, roomPassword }) => {
      console.log(
        `${username}, wants to create a room with\nroom name: ${roomName}\npassword: ${roomPassword}`
      );
    });
  });
};

export default handleSocket;

