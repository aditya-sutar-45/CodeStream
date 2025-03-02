import { Box, Button, Heading } from "@radix-ui/themes";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Box>
      <Heading>Page Not Found</Heading>
      <Link to={"/"}>
        <Button>Go back Home</Button>
      </Link>
    </Box>
  );
}

export default NotFoundPage;
