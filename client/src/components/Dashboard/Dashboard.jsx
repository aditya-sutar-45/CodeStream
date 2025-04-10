import { useAuth } from "../../hooks/useAuth";
import { Box, Flex, Heading, Button, Separator } from "@radix-ui/themes";
import NavHeader from "../Home/NavHeader";
import DashboardAvatar from "./DashboardAvatar";
import EditProfile from "./EditProfile";

export default function Dashboard() {
  const { currentUser, username } = useAuth();

  return (
    <Box style={{ overflow: "hidden" }}>
      <NavHeader />
      <Flex height="100%" width="100%" justify="center">
        <Box
          height="100vh"
          width="80vw"
          style={{ backgroundColor: "var(--gray-2)" }}
        >
          <Flex
            mt="3rem"
            height="50vh"
            justify="center"
            gap="2rem"
            align="center"
          >
            <DashboardAvatar username={username} />

            <Flex
              width="50%"
              overflow="hidden"
              height="100%"
              justify="start"
              mx="3"
              align="center"
            >
              <Box width="100%">
                <Flex
                  justify="start"
                  align="center"
                  width="100%"
                  height="40%"
                  gap="4"
                >
                  <Heading
                    weight="bold"
                    as="h1"
                    style={{ fontSize: "3rem", height: "100%" }}
                  >
                    {username}
                  </Heading>
                  <EditProfile />
                </Flex>
                <Heading
                  weight="regular"
                  as="h2"
                  size="4"
                  style={{ color: "gray" }}
                  my="4"
                >
                  {currentUser.email}
                </Heading>
                <Flex justify="start" gap="2" mt="6rem">
                  <Button color="red" size="3">
                    Delete Account
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Flex>
          <Separator style={{ width: "90%", margin: "auto" }} />
        </Box>
      </Flex>
    </Box>
  );
}
