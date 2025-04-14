import { Box, Button, Flex, Text, Tooltip } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";
import "./Home.css";
import HomeCanvas from "./HomeCanvas";
import NavHeader from "./NavHeader";
import { BackgroundBeams } from "./BackgroundBeams";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.unauthorized) {
      toast.error("Unauthorized access, login first!");
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <Box>
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
            Running on coffee and console logs...
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
      <Box
        style={{
          position: "fixed",
          inset: "0",
          zIndex: "0",
          pointerEvents: "none",
          height: "100vh",
        }}
      >
        <BackgroundBeams />
      </Box>
    </>
  );
}

export default Home;
