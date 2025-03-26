import {
  Container,
  Heading,
  Flex,
  Text,
  TextField,
  Button,
  Strong,
  Separator,
} from "@radix-ui/themes";
import NavHeader from "../Home/NavHeader";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import socket from "../../socket";

function JoinRoom() {
  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [roomError, setRoomError] = useState("");

  const navigate = useNavigate();
  const { username } = useAuth();

  socket.on("roomJoined", (roomId) => {
    navigate(`/rooms/${roomId}`);
  });

  socket.on("roomError", (error) => {
    setRoomError(error);
  });

  const joinRoom = () => {
    socket.emit("joinRoom", { username, roomId, roomPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(roomId, roomPassword);
    joinRoom();
  };
  return (
    <>
      <NavHeader />
      <Flex align="center" justify="center" height="100vh">
        <Container size="2">
          <Heading mb="1rem" align={"center"} size="9">
            Join a Room
          </Heading>
          <Separator size="4" />
          <form onSubmit={handleSubmit} action="" style={{ marginTop: "1rem" }}>
            <Text>
              Joining room as: <Strong>{username}</Strong>
            </Text>
            <Flex direction="column" gap="3">
              {roomError && (
                <Text color="red">Error in Creating room: {roomError}</Text>
              )}
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Room ID:
                </Text>
                <TextField.Root
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room ID"
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Password:
                </Text>
                <TextField.Root
                  value={roomPassword}
                  onChange={(e) => setRoomPassword(e.target.value)}
                  placeholder="Enter room password"
                  type="password"
                />
              </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Button
                variant="soft"
                color="gray"
                type="button"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Join</Button>
            </Flex>
          </form>
        </Container>
      </Flex>
    </>
  );
}

export default JoinRoom;
