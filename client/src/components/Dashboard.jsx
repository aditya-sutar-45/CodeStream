import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Button,
  Callout,
  Separator,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import NavHeader from "./Home/NavHeader";
import ProfilePicture from "./ProfilePicture";

export default function UserProfile() {
  const [error, setError] = useState("");
  const { currentUser, username, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch (e) {
      setError("Failed to log out! " + e.message);
    }
  }

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
            {error && (
              <Callout.Root color="red" style={{ marginTop: "1rem" }}>
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>{error}</Callout.Text>
              </Callout.Root>
            )}

            <Box width="40%" style={{ textAlign: "center" }} mx="3">
              <ProfilePicture
                username={username}
                styles={{ width: "20rem", height: "20rem" }}
                size="9"
              />
            </Box>

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
                  <Button color="crimson" style={{ width: "8rem" }}>
                    Edit Profile
                  </Button>

                  <Button onClick={handleLogout} style={{ width: "8rem" }}>
                    Logout
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
