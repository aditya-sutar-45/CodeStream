import { Box, Button, Heading, Container, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container
      size="3"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Tagline with Custom Gradient & Larger Font */}
      <Text
        as="p"
        size="4"
        style={{
          fontSize: "68px",
          fontWeight: 600,
          lineHeight: 1.4,
          textAlign: "center",
          marginBottom: "1.5rem",
          fontFamily: "'Exo 2', sans-serif",
          background: "linear-gradient(45deg, #ff5847 20%, #d699fb 84%, #9177ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Flow with Code
      </Text>

      {/* Transparent Gradient Box Section */}
      <Box
        style={{
          textAlign: "center",
          padding: "2.5rem",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(215, 189, 255, 0.4), rgba(230, 220, 255, 0.2))",
          backdropFilter: "blur(10px)", // Soft glass effect
          border: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Main Heading */}
        <Heading size="20" style={{ marginBottom: "1rem", color: "#fff" }}>
          Code Stream
        </Heading>

        {/* Purple Button */}
        <Flex justify="center">
          <Link to={"/room"}>
            <Button
              size="3"
              variant="soft"
              style={{
                backgroundColor: "#7B2CBF", // Deep Purple
                color: "white",
                fontWeight: 500,
                padding: "10px 20px",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(123, 44, 191, 0.4)", // Soft purple glow
              }}
            >
              Join Room
            </Button>
          </Link>
        </Flex>
      </Box>
    </Container>
  );
}

export default Home;
