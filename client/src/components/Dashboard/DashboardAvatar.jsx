import {
  Avatar,
  Box,
  Button,
  Dialog,
  Flex,
  Grid,
  IconButton,
  Separator,
} from "@radix-ui/themes";
import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import ProfilePicture from "../ProfilePicture";
import "./Dashboard.css";
import { DEFAULT_PROFILE_PIC_URLS } from "../../utils/constants";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const urls = DEFAULT_PROFILE_PIC_URLS();

function DashboardAvatar({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, setProfilePic } = useAuth();
  const updateProfilePic = (url) => {
    axios
      .patch(
        `https://codestream-1mvo.onrender.com/user/${currentUser.uid}`,
        {
          profilePic: url,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(() => {
        setProfilePic(url);
        toast.success("profile picture updated!");
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("error: ", error.message);
        toast.error(error);
      });
  };
  return (
    <Box
      width="40%"
      style={{ textAlign: "center", position: "relative" }}
      mx="3"
    >
      <ProfilePicture
        username={username}
        styles={{ width: "20rem", height: "20rem" }}
        size="9"
      />
      <Dialog.Root open={isOpen}>
        <Dialog.Trigger>
          <IconButton
            size="3"
            style={{
              position: "absolute",
              bottom: "5px",
              right: "25%",
            }}
            radius="full"
            onClick={() => setIsOpen(true)}
          >
            <Pencil1Icon />
          </IconButton>
        </Dialog.Trigger>
        <Dialog.Content>
          <Flex width="100%" align="center" justify="between">
            <Dialog.Title>Edit Profile Pic</Dialog.Title>
            <Dialog.Close>
              <IconButton
                color="crimson"
                variant="soft"
                onClick={() => setIsOpen(false)}
              >
                <Cross1Icon />
              </IconButton>
            </Dialog.Close>
          </Flex>
          <Dialog.Description size="2">
            Pick any profile picture
          </Dialog.Description>
          <Separator size="4" my="2" />
          <Flex width="100%" justify="center" align="center">
            <Grid columns="3" gap="5" rows="repeat(3, 15vh)" height="52vh">
              {urls.map((url, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="editAvatarButton"
                  onClick={() => {
                    updateProfilePic(url);
                  }}
                >
                  <Avatar size="8" src={url} />
                </Button>
              ))}
            </Grid>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
}

export default DashboardAvatar;
