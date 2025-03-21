import { Box, Button, Heading, Flex, Text } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import Auth from "./Auth";
import "../../css/Home.css";
import HomeCanvas from "./HomeCanvas";

function Home() {
  return (
    <Box style={{ height: "100vh", overflow: "hidden" }}>
      {/* Header with Authentication */}
      <Flex p="2" align="center">
        <Heading style={{ display: "inline" }}>CodeStream</Heading>
        <Box style={{ marginLeft: "auto" }}>
          <Auth />
        </Box>
      </Flex>

      <HomeCanvas />

      {/* Additional Info */}
      <Box className="mainContainer">
        <Box>
          <Text as="p" size="4" className="subtext">
            Code together, create faster, and innovate seamlessly in real time.
          </Text>

          <Flex justify="center">
            <Link to={"/room"}>
              <Button size="4" mx="1" className="joinRoomButton">
                Join Room
                <ArrowRightIcon />
              </Button>
            </Link>
            <Link to={"/room"}>
              <Button size="4" mx="1" className="joinRoomButton">
                Create Room
                <ArrowRightIcon />
              </Button>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
