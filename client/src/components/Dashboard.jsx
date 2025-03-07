import { useAuth } from "../contexts/AuthContext";
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
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch (e) {
      setError("failed to log out!", e.message);
    }
  }

  return (
    <Box
      mx="9"
      height="70vh"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error && (
        <Callout.Root color="red" style={{ width: "100%", marginTop: "50px" }}>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Card
        style={{
          marginTop: "10px",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Box p="2" m="1">
            <Heading align="center">Dashboard</Heading>
          </Box>
          <Box p="2" m="1">
            <Flex gap="3" align="center">
              <Avatar size="3" radius="full" fallback={currentUser.email[0]} />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {currentUser.email}
                </Text>
              </Box>
            </Flex>
          </Box>
          <Box p="2" m="1">
            <Button
              onClick={handleLogout}
              style={{ width: "100%" }}
              color="crimson"
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
export default Dashboard;
