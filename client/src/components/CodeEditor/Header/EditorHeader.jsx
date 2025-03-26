import { Flex, IconButton } from "@radix-ui/themes";
import HeaderLink from "../../HeaderLink";
import LanguageSelect from "./LanguageSelect";
import ThemeSelect from "./ThemeSelect";
import RoomId from "./RoomId";
import MemberList from "./MemberList";
import socket from "../../../socket";
import { ExitIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

function EditorHeader({
  language,
  languages,
  onSelectLanguage,
  theme,
  THEMES,
  onSelectTheme,
  room,
}) {
  const navigate = useNavigate();
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
      <IconButton
        color="red"
        mx="1"
        onClick={() => {
          socket.emit("leaveRoom", room.roomId, () => {
            navigate("/");
          });
        }}
      >
        <ExitIcon />
      </IconButton>
    </Flex>
  );
}

export default EditorHeader;
