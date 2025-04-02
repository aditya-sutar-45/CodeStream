import { Flex, Box, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import "./Home/Home.css";

function NotFoundPage() {
  return (
    <Flex direction="column" height="90vh" justify="center" align="center">
      <div className="animated-text">
        <h1 style={{ height: "41.5vh", fontSize: "15rem" }}>404</h1>
      </div>
      <Box style={{ textAlign: "center", fontSize: "1.4rem", fontFamily: "Noto Sans" }}>
        <h2 style={{ marginBottom: "0.6rem" }}>OOPS! PAGE NOT FOUND</h2>
        <h3 className="subtext" style={{ fontWeight: "normal" }}>Sorry, The page you’re looking for doesn’t exist</h3>
        <Link to={"/"}>
          <Button style={{
            backgroundColor: "#8a2be2", /* Blue Violet */
            color: "white",
            padding: "10px 20px",
            fontSize: "1rem",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s ease"
          }}>Back</Button>
        </Link>
      </Box>
    </Flex>
  );
}

export default NotFoundPage;