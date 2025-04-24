import { Strong, Separator, Flex, Box, Text } from "@radix-ui/themes";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import csharp from "react-syntax-highlighter/dist/esm/languages/hljs/csharp";
import LoadingDialogue from "./LoadingDialogue";
import { useEffect, useRef } from "react";
import EmptyInbox from "./EmptyInbox";
import MessageBody from "./MessageBody";

SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("csharp", csharp);

function MessagesContainer({ messages, loading }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <Flex
      ref={containerRef}
      direction="column"
      gap="1"
      width="100%"
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
      {messages.length > 0 ? (
        messages.map((msg, i) => (
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
            <MessageBody msg={msg} />
          </Box>
        ))
      ) : (
        <EmptyInbox />
      )}
      {loading && <LoadingDialogue />}
    </Flex>
  );
}

export default MessagesContainer;
