import { Box, DropdownMenu, Text, Button, Flex } from "@radix-ui/themes";

function LanguageSelect({ languages, language, onSelect }) {
  return (
    <Flex p="1">
      <Box p="1" mx="1">
        <Text size="4" align="left" weight="medium">
          {languages.length > 0
            ? "Language: "
            : "runtime is loading please wait..."}
        </Text>
      </Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            {languages.length > 0 ? language : "Loading..."}{" "}
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          {languages.length > 0 ? (
            languages.map(([lang, version], i) => (
              <DropdownMenu.Item
                key={i}
                onSelect={() => onSelect(lang)}
                data-state={language === lang ? "selected" : ""}
                style={{
                  color: language === lang ? "grey" : "inherit",
                }}
              >
                {lang} : {version}
              </DropdownMenu.Item>
            ))
          ) : (
            <DropdownMenu.Item disabled>Loading...</DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
}

export default LanguageSelect;