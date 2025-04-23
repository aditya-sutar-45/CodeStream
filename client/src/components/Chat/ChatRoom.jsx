import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton, Popover, Strong, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import MessagesContainer from "./MessagesContainer";
import socket from "../../socket";
import { EVENTS } from "../../utils/constants";
import { useAuth } from "../../hooks/useAuth";
import background from "../../assets/img/blurry-grad.png";
import axios from "axios";

function ChatRoom({ roomId }) {
  const { username } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleMessageReceive = (data) => {
      console.log("from server: ", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on(EVENTS.CHAT.RECEIVE, handleMessageReceive);

    return () => {
      socket.off(EVENTS.CHAT.RECEIVE, handleMessageReceive);
    };
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    const trimmedMsg = message.trim();
    console.log(roomId, message, username);

    if (trimmedMsg.startsWith("/")) {
      const command = trimmedMsg.slice(1);

      socket.emit(EVENTS.CHAT.SEND, { roomId, message: trimmedMsg, username });
      setMessage("");
      setLoading(true);

      try {
        const res = await axios.post("http://localhost:3000/chat", {
          message: command,
        });
        socket.emit(EVENTS.CHAT.SEND, {
          roomId,
          message: res.data.message,
          username: res.data.username || "AI response",
        });
        setLoading(false);
      } catch (error) {
        console.log("ERROR:", error);
        socket.emit(EVENTS.CHAT.SEND, {
          roomId,
          message: "failed to get response from the AI",
          username: "AI",
        });
      }
      return;
    }
    socket.emit(EVENTS.CHAT.SEND, { roomId, message, username });

    setMessage("");
  };

  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton
            radius="full"
            size="4"
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              zIndex: 10,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-message-circle-more-icon lucide-message-circle-more"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              <path d="M8 12h.01" />
              <path d="M12 12h.01" />
              <path d="M16 12h.01" />
            </svg>
          </IconButton>
        </Popover.Trigger>
        <Popover.Content
          style={{
            height: "85vh",
            width: "45vw",
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Flex
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <MessagesContainer messages={messages} loading={loading} />
            <Flex
              p="2"
              style={{
                backgroundColor: "var(--color-background)",
                borderRadius: "8px",
                marginTop: "auto",
              }}
              // justify="center"
              direction="column"
              // align="end"
              width="100%"
              gap="1"
            >
              <Box width="100%" flexGrow="1">
                <Text>
                  use <Strong>&quot;/&quot;</Strong> to ask AI
                </Text>
              </Box>
              <Flex>
                <textarea
                  placeholder="send a message...."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={2}
                  style={{
                    width: "80%",
                    resize: "none",
                    border: "2px solid var(--accent-6)",
                    borderRadius: "8px",
                    outline: "none",
                    paddingLeft: "8px",
                    backgroundColor: "var(--color-background)",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                  }}
                />
                <IconButton
                  style={{ width: "20%", height: "100%" }}
                  mx="1"
                  variant="soft"
                  onClick={handleSendMessage}
                >
                  <PaperPlaneIcon />
                </IconButton>
              </Flex>
            </Flex>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </>
  );
}

export default ChatRoom;
