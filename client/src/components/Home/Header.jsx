import Auth from "./Auth";
import { Flex, Box } from "@radix-ui/themes";
import HeaderLink from "../HeaderLink";

function Header() {
  return (
    <Flex p="2" align="center">
      <HeaderLink />
      <Box style={{ marginLeft: "auto" }}>
        <Auth />
      </Box>
    </Flex>
  );
}
export default Header;
