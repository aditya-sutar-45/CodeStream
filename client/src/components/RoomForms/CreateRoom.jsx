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
import { Box } from "@radix-ui/themes";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../../socket";
import { EVENTS } from "../../utils/constants";
import toast from "react-hot-toast";
import "../Home/Home.css";
import { BackgroundBeams } from "../Home/BackgroundBeams";

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
    if (!roomName) {
      setRoomError("room name cannot be empty!!");
      return;
    }

    if (!roomPassword) {
      setRoomError("room password cannot be empty!!");
      return;
    }

    createRoom();
  };

  useEffect(() => {
    if (!roomError) return;
    toast.error(roomError);
  }, [roomError]);

  return (
    <>
      <NavHeader />
      <Flex align="center" justify="center" height="100vh" className="mainContainer">
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
      <Box
        style={{
          position: "fixed",
          inset: "0",
          zIndex: "0",
          pointerEvents: "none",
          height: "100vh",
        }}
      >
        <BackgroundBeams/>
      </Box>
    </>
  );
}

export default CreateRoom;
