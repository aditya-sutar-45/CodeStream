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

function RoomId({ room }) {
  return (
    <Popover.Root>
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
                <Code variant="ghost">{room.roomId}</Code>
                <IconButton
                  size="1"
                  aria-label="Copy value"
                  color="gray"
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(room.roomId);
                    alert("copied room id to clipboard");
                  }}
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
