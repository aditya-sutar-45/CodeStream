import { Box, Button, Flex, Text, Tooltip } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import "../../css/Home.css";
import HomeCanvas from "./HomeCanvas";
import NavHeader from "./NavHeader";

function Home() {
  return (
    <Box style={{ height: "100vh", overflow: "hidden" }}>
      {/* Header with Authentication */}
      <NavHeader />

      {/* Additional Info */}
      <Flex
        justify="center"
        align="center"
        wrap="nowrap"
        direction="column"
        height="100vh"
        className="mainContainer"
      >
        <HomeCanvas />

        {/* Animated GIF */}
        <Box className="gifContainer" width="100vw">
          <Tooltip content="meow :3">
            <img
              src="/images/icons/whiteboard/cat.gif"
              alt="Animated Logo"
              className="animatedGif"
            />
          </Tooltip>
        </Box>

        <Box width="100vw">
          <Text as="p" size="4" className="subtext">
            Code together, create faster, and innovate seamlessly in real time.
          </Text>

          <Flex justify="center">
            <Link to={"/rooms/join"}>
              <Button size="4" mx="1" className="joinRoomButton">
                Join Room
                <ArrowRightIcon />
              </Button>
            </Link>
            <Link to={"/rooms/create"}>
              <Button size="4" mx="1" className="joinRoomButton">
                Create Room
                <ArrowRightIcon />
              </Button>
            </Link>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default Home;
