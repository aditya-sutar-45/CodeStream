import { useAuth } from "../../hooks/useAuth";
import {
  Box,
  Flex,
  Heading,
  Button,
  Separator,
} from "@radix-ui/themes";
import NavHeader from "../Home/NavHeader";
import DashboardAvatar from "./DashboardAvatar";

export default function Dashboard() {
  const { currentUser, username} = useAuth();

  return (
    <Box style={{ overflow: "hidden" }}>
      <NavHeader />
      <Flex height="100%" width="100%" justify="center">
        <Box
          height="100vh"
          width="75vw"
          style={{ backgroundColor: "var(--gray-2)" }}
        >
          <Flex
            mt="3rem"
            height="50vh"
            justify="center"
            gap="2rem"
            align="center"
          >

            <DashboardAvatar username={username}/>

            {/* <Separator orientation="vertical" style={{height: "90%"}} /> */}

            <Flex
              width="40%"
              overflow="hidden"
              height="100%"
              justify="start"
              mx="3"
              align="center"
            >
              <Box>
                <Heading
                  weight="bold"
                  as="h1"
                  style={{ fontSize: "3rem", height: "40%" }}
                  my="4"
                >
                  {username}
                </Heading>
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
                  <Button style={{ width: "8rem" }}>
                    Edit Profile
                  </Button>

                  <Button color="red" style={{ width: "8rem" }}>
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
