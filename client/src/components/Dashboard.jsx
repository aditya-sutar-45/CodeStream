import { useAuth } from "../hooks/useAuth";
import {
  Heading,
  Box,
  Card,
  Flex,
  Avatar,
  Text,
  Button,
  Callout,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
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
    <Flex justify="center" align="center" height="80vh">
      <Card style={{ width: "400px", padding: "24px", textAlign: "center" }}>
        <Heading size="4">Dashboard</Heading>
        {error && (
          <Callout.Root color="red" style={{ marginTop: "16px" }}>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <Box mt="4">
          <Avatar size="5" radius="full" fallback={username[0].toUpperCase()} />
          <Text as="div" size="3" weight="bold" mt="2">
            {username}
          </Text>
          <Text as="div" size="2" color="gray">
            {currentUser.email}
          </Text>
        </Box>
        <Box mt="4">
          <Button
            onClick={handleLogout}
            color="crimson"
            size="3"
            style={{ width: "100%" }}
            my="1"
          >
            Logout
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            size="3"
            style={{ width: "100%" }}
            my="1"
          >
            Home
          </Button>
        </Box>
      </Card>
    </Flex>
  );
}

export default Dashboard;
