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
import { EVENTS } from "../../utils/constants";

function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [roomError, setRoomError] = useState("");

  const navigate = useNavigate();
  const { username } = useAuth();

  socket.on(EVENTS.ROOM.CREATED, (roomId) => {
    navigate(`/rooms/${roomId}`);
  });

  socket.on(EVENTS.ROOM.ERROR, (error) => {
    setRoomError(error);
  });

  const createRoom = () => {
    // emit room creation
    // socket.emit("createRoom")
    socket.emit(EVENTS.ROOM.CREATE, { username, roomName, roomPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(roomName, roomPassword);
    createRoom();
  };

  return (
    <>
      <NavHeader />
      <Flex align="center" justify="center" height="100vh">
        <Container size="2">
          <Heading mb="1rem" align={"center"} size="9">
            Create a Room
          </Heading>
          <Separator size="4" />
          <form action="" onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
            <Text>
              Creating room as: <Strong>{username}</Strong>
            </Text>
            <Flex direction="column" gap="3">
              {roomError && (
                <Text color="red">Error in Creating room: {roomError}</Text>
              )}
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Room Name:
                </Text>
                <TextField.Root
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Enter room name"
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
                type="button"
                variant="soft"
                color="gray"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </Flex>
          </form>
        </Container>
      </Flex>
    </>
  );
}

export default CreateRoom;
