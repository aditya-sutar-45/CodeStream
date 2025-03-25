import { Flex } from "@radix-ui/themes";
import HeaderLink from "../../HeaderLink";
import LanguageSelect from "./LanguageSelect";
import ThemeSelect from "./ThemeSelect";
import RoomId from "./RoomId";
import MemberList from "./MemberList";

function EditorHeader({
  language,
  languages,
  onSelectLanguage,
  theme,
  THEMES,
  onSelectTheme,
  room,
}) {
  return (
    <Flex p="1">
      <HeaderLink />
      <LanguageSelect
        language={language}
        languages={languages}
        onSelect={onSelectLanguage}
      />
      <ThemeSelect
        currentSelectedTheme={theme}
        themes={THEMES}
        onSelect={onSelectTheme}
      />
      <RoomId room={room} />
      <MemberList users={room.users} roomName={room.roomName} />
    </Flex>
  );
}

export default EditorHeader;
