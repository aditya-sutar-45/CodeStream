import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Button,
  Callout,
  Container,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import NavHeader from "./Home/NavHeader";

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
      <Container size="2" height="40vh">
        <Flex mt="3rem" height="40vh" justify="center" align="center" gap="5">
          {error && (
            <Callout.Root color="red" style={{ marginTop: "1rem" }}>
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          <Box style={{ width: "50%", textAlign: "center" }}>
            <Avatar size="9" radius="full" fallback={username[0].toUpperCase()}
              style={{ justifyContent: "center", width: "15rem", height: "15rem" }} />
          </Box>

          <Flex width="30vw">
            <Box>
              <Heading weight="bold" as="h1" size="9">{username}</Heading>
              <Heading weight="regular" as="h2" size="5" style={{ color: "gray"}}>{currentUser.email}
              </Heading>
              <Flex justify="start" gap="2" mt="6rem" >
                <Button color="crimson" style={{ width:"8rem" }}>
                  Edit Profile
                </Button>

                <Button onClick={handleLogout} style={{ width: "8rem" }}>
                  Logout
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Container>
      <div
        style={{
          height: "0.1rem",
          width: "55%",
          backgroundColor: "gray",
          margin: "3% auto",
        }}
      />
    </Box>
  );
}    