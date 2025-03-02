import { DropdownMenu, Button } from "@radix-ui/themes";

function ThemeSelect() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          Options
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Nord</DropdownMenu.Item>
        <DropdownMenu.Item>Github Dark </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default ThemeSelect;
