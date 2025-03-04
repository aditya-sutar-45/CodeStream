import { DropdownMenu, Button, Box} from "@radix-ui/themes";

function ThemeSelect({theme, themes, onSelect}) {
  return (
    <Box px="1">
      {/* <Box p="1" mx="1">
        <Text size="4" align="left" weight="medium">
          Themes 
        </Text>
      </Box> */}

      {/* {themes.map((t, i) => (<DropdownMenu.Item>t</DropdownMenu.Item>))} */}

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            nord
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Nord</DropdownMenu.Item>
          <DropdownMenu.Item>Github Dark </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}

export default ThemeSelect;
