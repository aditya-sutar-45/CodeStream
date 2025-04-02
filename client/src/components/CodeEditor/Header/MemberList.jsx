import {
  Popover,
  Heading,
  Text,
  Flex,
  Avatar,
  Tooltip,
  IconButton,
} from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

function MemberList({ room }) {
  const { username } = useAuth();
  const users = room.users;
  const [profilePics, setProfilePics] = useState([]);

  useEffect(() => {
    if (!users.length) return;

    const fetchProfilePics = async () => {
      try {
        const responses = await Promise.all(
          users.map((user) =>
            axios.get(`http://localhost:3000/username/${user.username}`)
          )
        );

        const picsMap = responses.reduce((acc, res, i) => {
          acc[users[i].username] = res.data.profilePic;
          return acc;
        }, {});

        setProfilePics(picsMap);
      } catch (error) {
        console.error("Error fetching profile pictures:", error);
      }
    };

    fetchProfilePics();
  }, [users]);

  return (
    <Popover.Root>
      <Tooltip content="all members">
        <Popover.Trigger>
          <IconButton mx="1" variant="soft">
            <HamburgerMenuIcon width="16" height="16" />
          </IconButton>
        </Popover.Trigger>
      </Tooltip>
      <Popover.Content>
        <Heading size="4" align="center" my="1">
          Members
        </Heading>
        <Flex
          justify="center"
          align="between"
          wrap="nowrap"
          direction="column"
          width="auto"
        >
          {users &&
            users.map((user, i) => (
              <Flex key={i} justify="start" align="center" gap="2" my="1">
                <Avatar
                  src={profilePics[user.username]}
                  size="2"
                  fallback="A"
                  radius="full"
                />
                <Text
                  as="p"
                  size="3"
                  color={user.username === username && "gray"}
                >
                  {user.username}
                </Text>
              </Flex>
            ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}

export default MemberList;
