import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Box } from "@radix-ui/themes";

function MessageBody({msg}) {
  return (
    <Box my="1" style={{ overflow: "hidden" }}>
      <div
        className="markdown-content"
        style={{
          position: "relative",
          paddingLeft: "1rem",
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
                <ul style={{ paddingLeft: "16px", marginLeft: 0 }} {...props} />
              );
            },
            ol({ ...props }) {
              return (
                <ol style={{ paddingLeft: "16px", marginLeft: 0 }} {...props} />
              );
            },
            li({ ...props }) {
              return <li style={{ marginBottom: "0.25rem" }} {...props} />;
            },
          }}
        >
          {msg.message}
        </ReactMarkdown>
      </div>
    </Box>
  );
}

export default MessageBody;
