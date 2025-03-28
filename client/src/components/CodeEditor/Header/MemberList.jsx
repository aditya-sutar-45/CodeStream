import {
  Popover,
  Button,
  Heading,
  Text,
  Flex,
  Separator,
  HoverCard,
} from "@radix-ui/themes";
import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";

function MemberList({ users, roomName }) {
  return (
    <HoverCard.Root>
      <Popover.Root>
        <HoverCard.Trigger>
          <Popover.Trigger>
            <Button variant="soft">
              <HamburgerMenuIcon width="16" height="16" />
            </Button>
          </Popover.Trigger>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <Text>Members List</Text>
        </HoverCard.Content>
        <Popover.Content>
          <Heading m="2">{roomName}</Heading>
          <Separator size="4" />
          <Flex
            justify="center"
            align="end"
            wrap="nowrap"
            direction="column"
            width="auto"
            m="1"
          >
            {users &&
              users.map((user, i) => (
                <Flex
                  key={i}
                  justify="center"
                  align="center"
                  gap="2"
                  flexGrow="1"
                  m="1"
                >
                  <PersonIcon height="20" width="20" />
                  <Text as="p" size="3">
                    {user.username}
                  </Text>
                </Flex>
              ))}
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </HoverCard.Root>
  );
}

export default MemberList;
