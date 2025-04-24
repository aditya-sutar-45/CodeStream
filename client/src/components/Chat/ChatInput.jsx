import { Flex, Box, Text, Strong, IconButton } from "@radix-ui/themes";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

function ChatInput({ message, setMessage, handleSendMessage }) {
  return (
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
  );
}

export default ChatInput;
