import { Flex, Text, Strong, IconButton } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";

function ChatHeader({ room, setOpen }) {
  return (
    <Flex
      justify="between"
      align="center"
      width="100%"
      py="1"
      px="2"
      style={{
        backgroundColor: "var(--color-background)",
        borderRadius: "8px",
      }}
    >
      <Text>
        <Strong>{room.roomName}</Strong> - Chat
      </Text>
      <IconButton color="red" variant="soft" onClick={() => setOpen(false)}>
        <Cross1Icon />
      </IconButton>
    </Flex>
  );
}

export default ChatHeader;
