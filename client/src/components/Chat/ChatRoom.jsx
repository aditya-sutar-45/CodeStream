import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Box, Flex, IconButton, Strong, Text } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);

  const chatRef = useRef();
  const chatButtonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(e.target) &&
        !chatButtonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

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
      } catch (error) {
        console.log("ERROR:", error);
        socket.emit(EVENTS.CHAT.SEND, {
          roomId,
          message: "failed to get response from the AI",
          username: "AI",
        });
      } finally {
        setLoading(false);
      }
      return;
    }

    socket.emit(EVENTS.CHAT.SEND, { roomId, message, username });
    setMessage("");
  };

  return (
    <>
      <IconButton
        ref={chatButtonRef}
        radius="full"
        size="4"
        onClick={() => setOpen((prev) => !prev)}
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

      {open && (
        <Flex
          ref={chatRef}
          height="85vh"
          width="35vw"
          direction="column"
          position="absolute"
          bottom="80px"
          right="20px"
          overflow="hidden"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 100,
            borderRadius: "8px",
          }}
        >
          <Flex m="auto" direction="column" height="98%" width="95%">
            <MessagesContainer messages={messages} loading={loading} />
            <Flex
              p="2"
              style={{
                backgroundColor: "var(--color-background)",
                borderTop: "2px solid var(--accent-6)",
                borderRadius: "0 0 8px 8px",
              }}
              direction="column"
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
        </Flex>
      )}
    </>
  );
}

export default ChatRoom;
