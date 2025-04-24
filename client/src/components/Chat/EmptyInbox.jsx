import { Flex, Tooltip } from "@radix-ui/themes";

function EmptyInbox() {
  return (
    <Flex height="100%" align="center" justify="center" direction="column">
      <Tooltip content="WOW...so empty">
        <img
          src="/images/icons/whiteboard/cat.gif"
          alt="cat"
          height="100px"
          width="auto"
        />
      </Tooltip>
    </Flex>
  );
}

export default EmptyInbox;
