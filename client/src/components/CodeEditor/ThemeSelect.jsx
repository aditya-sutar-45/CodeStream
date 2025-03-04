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
          {themes.length > 0 ? (
            themes.map ((t,i) => (
              <DropdownMenu.Item
                key={i}
                onSelect={() => onSelect(t)}
                data-state={theme === t ? "selected" : ""}
                style={{
                  color: theme === t ? "grey" : "inherit",
                }}
                >
                  {t}
                </DropdownMenu.Item>
            ))) : (
              <DropdownMenu.Item disabled>No Themes</DropdownMenu.Item>
            )}
              
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}

export default ThemeSelect;
