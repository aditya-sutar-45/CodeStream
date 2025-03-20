// import "../css/App.css";
import { Box, Button, Heading, Container, Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import Auth from "./Auth";



function Home() {
  return (
    <>
      {/* Header with Authentication */}
      <Flex p="2" align="center">
        <Heading style={{ display: "inline" }}>CodeStream</Heading>
        <Box style={{ marginLeft: "auto" }}>
          <Auth />
        </Box>
      </Flex>

      {/* Main Container - Centers Everything */}
      <Container
        size="3"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        {/* Tagline */}
        <Text
          as="p"
          size="4"
          style={{
            fontSize: "6vw",
            fontWeight: 900,
            lineHeight: 1.4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "1.5rem",
            fontFamily: "'Space Grotesk', sans-serif",
            background:"linear-gradient(45deg, #ff5847 20%, #d699fb 84%, #9177ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            width: "100%",
          }}
        >
          Flow with Code
        </Text>

        {/* Subtext - Fully Centered */}

        <Text
          as="p"
          size="4"
          style={{
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: 1.5,
            display: "inline-block",
            whiteSpace: "nowrap",
            textAlign: "center",
            maxWidth: "100%", 
            color: "#ffffff80",
            marginBottom: "1.5rem",
          }}
        >
          Code together, create faster, and innovate seamlessly in real time.
        </Text>

        {/* Join Room Button */}
        <Flex justify="center">
          <Link to={"/room"}>
            <Button
              size="4" 
              style={{
              backgroundColor: "#7B2CBF",
              color: "white",
              fontWeight: 600,
              fontSize: "20px",
              padding: "16px 32px", 
             // width: "250px",
              //height: "60px",
              borderRadius: "8px",
              boxShadow: "0 4px 34px rgba(123, 44, 191, 0.5)", 
              }}
            >
              Join Room
            </Button>
          </Link>
        </Flex>
      </Container>
    </>
  );
}

export default Home;
