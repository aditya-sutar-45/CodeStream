import { Strong, Separator, Flex, Box, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import csharp from "react-syntax-highlighter/dist/esm/languages/hljs/csharp";
import LoadingDialogue from "./LoadingDialogue";

SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("py", python);
SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("ts", typescript);
SyntaxHighlighter.registerLanguage("csharp", csharp);

function MessagesContainer({ messages, loading }) {
  return (
    <Flex
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
          <Box my="1" style={{ overflow: "hidden" }}>
            <div
              className="markdown-content"
              style={{
                position: "relative",
                paddingLeft: "1rem", // Give space for list markers
              }}
            >
              <ReactMarkdown
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline ? (
                      <SyntaxHighlighter
                        style={atomOneDark}
                        language={match?.[1] || "text"}
                        PreTag="div"
                        customStyle={{
                          borderRadius: "8px",
                          padding: "8px",
                          backgroundColor: "var(--gray-4)",
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code
                        style={{
                          backgroundColor: "var(--gray-4)",
                          borderRadius: "8px",
                          padding: "8px",
                        }}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  ul({ ...props }) {
                    return (
                      <ul
                        style={{ paddingLeft: "16px", marginLeft: 0 }}
                        {...props}
                      />
                    );
                  },
                  ol({ ...props }) {
                    return (
                      <ol
                        style={{ paddingLeft: "16px", marginLeft: 0 }}
                        {...props}
                      />
                    );
                  },
                  li({ ...props }) {
                    return (
                      <li style={{ marginBottom: "0.25rem" }} {...props} />
                    );
                  },
                }}
              >
                {msg.message}
              </ReactMarkdown>
            </div>
          </Box>
        </Box>
      ))}
      {loading && <LoadingDialogue />}
    </Flex>
  );
}

export default MessagesContainer;
