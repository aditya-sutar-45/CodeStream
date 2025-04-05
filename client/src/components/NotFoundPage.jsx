import { Flex, Box, Button, Heading, Text } from "@radix-ui/themes";
import { Link, useMatch, useParams } from "react-router-dom";
import "./Home/Home.css";

function NotFoundPage() {
  const isRoomError = useMatch("/rooms/:id");
  const { id } = useParams();

  return (
    <Flex direction="column" height="90vh" justify="center" align="center">
      <div className="animated-text">
        <h1 style={{ height: "41.5vh", fontSize: "15rem" }}>404</h1>
      </div>
      <Box
        style={{
          textAlign: "center",
          fontSize: "1.4rem",
          fontFamily: "Noto Sans",
        }}
      >
        <Heading style={{ marginBottom: "0.6rem" }}>
          {isRoomError ? "Room Not Found!" : "Page Not Found!"}
        </Heading>
        <Text as="div" className="subtext">
          {isRoomError
            ? `Room with id: ${id} does not exist :(`
            : "The page your are looking for does not exist!"}
        </Text>
        <Link to={"/"}>
          <Button>Back</Button>
        </Link>
      </Box>
    </Flex>
  );
}

export default NotFoundPage;
