import { Box, Button, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";

function Home() {

    return (
      <Box>
        <Heading>Code Stream</Heading>
        <Link to={"/room"}>
            <Button>Room</Button>
        </Link>
      </Box>
    );

}

export default Home;