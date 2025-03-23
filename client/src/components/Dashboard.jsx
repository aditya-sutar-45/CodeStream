import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
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
import NavHeader from "./Home/NavHeader";

export default function UserProfile() {
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState("Software Developer at XYZ");
  const [isEditing, setIsEditing] = useState(false);
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
    <Box style={{ height: "100vh", overflow: "hidden" }}>
      <NavHeader />
      <Flex justify="center" align="center" height="80vh">

        {error && (
          <Callout.Root color="red" style={{ marginTop: "16px" }}>
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <Box mt="4">
          <Avatar size="9" radius="full" fallback={username[0].toUpperCase()} style={{ width: "250px", height: "250px", marginLeft: "-90%", marginTop: "-90%", }} />

        </Box>
          <Box mt="400px">
            <Flex gap="4" justify="center" style={{ marginLeft: "58.5%", marginBottom: "190%" }}>
              <Button color="crimson" style={{ width: "250%", marginLeft: "-250.5%" }} my="1">
                Edit Profile
              </Button>
              <Button style={{ width: "250%", marginLeft: "2.5%" }} my="1">
                Delete Profile
              </Button>
            </Flex>
          </Box>
        
        <Box textAlign="centre" style={{ marginBottom: "20%", display: "flex", flexDirection: "column", gap: "5px", textAlign: "left", marginLeft: "-46.5%", paddingLeft: "20%" }}>
          <Text as="div" size="9" weight="bold">
            {username}
          </Text>
          <Text as="div" size="5" color="gray">
            {currentUser.email}
          </Text>
        </Box>
      </Flex>

      <div style={{height: "2px", width: "65%", backgroundColor: "gray", margin: "-16% 18%"}} />

    </Box>
  );
}