import {
  Badge,
  Flex,
  Code,
  IconButton,
  Popover,
  DataList,
  Tooltip,
} from "@radix-ui/themes";
import { CopyIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import toast, {Toaster} from "react-hot-toast";

function RoomId({ room }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(room.roomId).then(() => {
      toast.success("room id copied to clipboard");
    })
  };

  const truncatedId = (id) => id.length > 8 ? id.slice(0, 8) + "...." : id;

  return (
    <Popover.Root>
      <Toaster />
      <Tooltip content="room info">
        <Popover.Trigger>
          <IconButton mx="1" variant="soft">
            <InfoCircledIcon />
          </IconButton>
        </Popover.Trigger>
      </Tooltip>
      <Popover.Content>
        <DataList.Root>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Room Owner</DataList.Label>
            <DataList.Value>
              <Badge color="jade" variant="soft" radius="full">
                {room.owner.username}
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">ID</DataList.Label>
            <DataList.Value>
              <Flex align="center" gap="2">
                <Tooltip content={room.roomId}>
                  <Code variant="ghost">{truncatedId(room.roomId)}</Code>
                </Tooltip>
                <IconButton
                  size="1"
                  aria-label="Copy value"
                  color="gray"
                  variant="ghost"
                  onClick={copyToClipboard}
                >
                  <CopyIcon />
                </IconButton>
              </Flex>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Room Name</DataList.Label>
            <DataList.Value>{room.roomName}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Member Count</DataList.Label>
            <DataList.Value>{room.users.length}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Popover.Content>
    </Popover.Root>
  );
}

export default RoomId;
