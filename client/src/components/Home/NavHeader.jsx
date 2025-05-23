import Auth from "./Auth";
import { Flex, Box, IconButton } from "@radix-ui/themes";
import HeaderLink from "../HeaderLink";
import { useMatch, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

function NavHeader() {
  const navigate = useNavigate();
  const isHome = useMatch("/");

  const match = useMatch("/rooms/:id"); // Ensure this is always called
  const isRoom =
    match?.params?.id && !["create", "join"].includes(match.params.id);

  const shouldShowBackButton = !isHome && !isRoom;

  return (
    <Flex
      p="2"
      align="center"
      position="fixed"
      style={{ zIndex: 1000}}
      width="100%"
    >
      {shouldShowBackButton && (
        <IconButton
          mr="2"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <ArrowLeftIcon />
        </IconButton>
      )}
      <HeaderLink />
      <Box style={{ marginLeft: "auto" }}>
        <Auth />
      </Box>
    </Flex>
  );
}
export default NavHeader;
