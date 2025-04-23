import { Strong, Separator, Flex, Box, Text } from "@radix-ui/themes";

function MessagesContainer({ messages }) {
  return (
    <Flex
      direction="column"
      gap="1"
      mx="1"
      my="2"
      p="2"
      overflowY="auto"
      style={{
        flex: 1,
        backgroundColor: "var(--color-background)",
        borderRadius: "8px",
        minHeight: 0,
      }}
    >
      {messages.map((msg, i) => (
        <Box
          key={i}
          p="1"
          my="1"
          style={{
            backgroundColor: "var(--gray-3)",
            borderRadius: "8px",
          }}
        >
          <Flex justify="between" width="100%">
            <Strong>{msg.username}</Strong>
            <Text>
              {new Date(msg.timeStamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Text>
          </Flex>
          <Separator size="4" />
          <Text
            as="div"
            mt="1"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {msg.message}
          </Text>
        </Box>
      ))}
    </Flex>
  );
}

export default MessagesContainer;
