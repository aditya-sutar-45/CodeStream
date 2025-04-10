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

function EditProfile() {
  const { username } = useAuth();
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
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default EditProfile;
