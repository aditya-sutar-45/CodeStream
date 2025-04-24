import { io } from "socket.io-client";

const socket = io.connect("https://codestream-bju7.onrender.com", {
  transports: ["websocket"],
  autoConnect: true,
  reconnectionAttempts: 5,
});

export default socket;
