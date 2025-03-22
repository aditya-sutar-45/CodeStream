import Auth from "./Auth";
import { Flex, Box } from "@radix-ui/themes";
import HeaderLink from "../HeaderLink";

function NavHeader() {
  return (
    <Flex p="2" align="center" position="fixed" style={{zIndex: 1}} width="100%">
      <HeaderLink />
      <Box style={{ marginLeft: "auto" }}>
        <Auth />
      </Box>
    </Flex>
  );
}
export default NavHeader;
