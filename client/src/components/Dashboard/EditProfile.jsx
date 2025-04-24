import {
  Dialog,
  IconButton,
  Flex,
  Text,
  TextField,
  Button,
} from "@radix-ui/themes";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

function EditProfile() {
  const [newUsername, setNewUsername] = useState("");
  const { currentUser, username, setUsername } = useAuth();
  const updateUsername = (_username) => {
    axios
      .patch(
        `https://codestream-bju7.onrender.com/user/${currentUser.uid}`,
        {
          username: _username,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        setUsername(_username);
        toast.success("username updated!");
      })
      .catch((error) => {
        console.error("error: ", error);
        const msg = error.response?.data?.message || "Something went wrong";
        toast.error(msg);
      });
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton variant="soft" radius="full">
          <Pencil1Icon />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Username:
            </Text>
            <TextField.Root
              defaultValue={username}
              placeholder="your username..."
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </label>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={() => updateUsername(newUsername)}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default EditProfile;
