import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000", {
  transports: ["websocket"],
  autoConnect: true,
  reconnectionAttempts: 5,
});

export default socket;
