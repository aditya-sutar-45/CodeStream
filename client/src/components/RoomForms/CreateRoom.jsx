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

function CreateRoom() {
  const navigate = useNavigate();
  const { username } = useAuth();
  return (
    <>
      <NavHeader />
      <Flex align="center" justify="center" height="100vh">
        <Container size="2">
          <Heading mb="1rem" align={"center"} size="9">
            Create a Room
          </Heading>
          <Separator size="4" />
          <form action="" style={{ marginTop: "1rem" }}>
            <Text>
              Creating room as: <Strong>{username}</Strong>
            </Text>
            <Flex direction="column" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Room Name:
                </Text>
                <TextField.Root placeholder="Enter room name" />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Password:
                </Text>
                <TextField.Root
                  placeholder="Enter room password"
                  type="password"
                />
              </label>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Button
                variant="soft"
                color="gray"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/room");
                }}
              >
                Create
              </Button>
            </Flex>
          </form>
        </Container>
      </Flex>
    </>
  );
}

export default CreateRoom;
