import { Flex, Code, IconButton } from "@radix-ui/themes";
import { CopyIcon } from "@radix-ui/react-icons";

function RoomId({room}) {
  return (
    <Flex align="center" justify="center" gap="2" mx="1">
      <Code variant="ghost">{room.roomId}</Code>
      <IconButton
        size="1"
        aria-label="Copy value"
        color="gray"
        variant="ghost"
        onClick={() => {
          navigator.clipboard.writeText(room.roomId);
          // TODO MAKE IT SO THAT SOME FLASH THING APPEARS
          alert("copied room id to clipboard!");
        }}
      >
        <CopyIcon />
      </IconButton>
    </Flex>
  );
}

export default RoomId;
