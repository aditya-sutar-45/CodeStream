import { Box } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "./CodeEditor";
import {
  CODE_SNIPPETS,
  EVENTS,
  LANGUAGE_VERSIONS,
} from "../../utils/constants";
import { getLanguageVersion } from "../../utils/api";
import Output from "./Output";
import { defineMonacoThemes } from "../../utils/themes";
import { THEMES } from "../../utils/themes";
import EditorHeader from "./Header/EditorHeader";
import socket from "../../socket";

function CodeEditorPanel({ room }) {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [languages, setLanguages] = useState({});
  const [theme, setTheme] = useState("vs-dark");

  useEffect(() => {
    const updateLanguageVersions = async () => {
      const updatedVersions = {};
      for (const lang in LANGUAGE_VERSIONS) {
        updatedVersions[lang] = await getLanguageVersion(lang);
        LANGUAGE_VERSIONS[lang] = updateLanguageVersions[lang];
      }
      setLanguages(Object.entries(updatedVersions));
    };
    updateLanguageVersions();

    if (!socket) return;
    const handleLanguageUpdate = (data) => {
      if (data.userId !== socket.id) {
        setLanguage(data.language);
      }
    };
    socket.on(EVENTS.CODE.LANGUAGE_UPDATE, handleLanguageUpdate);
    return () => {
      socket.off(EVENTS.CODE.LANGUAGE_UPDATE, handleLanguageUpdate);
    };
  }, []);

  useEffect(() => {
    window.monaco?.editor.setTheme(theme);
  }, [theme]);

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();
    defineMonacoThemes(monaco);
  };

  const onSelectLanguage = (language) => {
    setLanguage(language);
    const roomId = room.roomId;
    if (socket && room.roomId) {
      socket.emit(EVENTS.CODE.LANUGAGE_CHANGE, {
        roomId,
        language,
      });
    }
    setValue(CODE_SNIPPETS[language]);
    if (socket && roomId) {
      socket.emit(EVENTS.CODE.SYNC, {
        roomId,
        code: CODE_SNIPPETS[language],
      });
    }
  };

  const onSelectTheme = (theme) => {
    setTheme(theme);
  };

  return (
    <Box height="100vh" width="100%">
      <PanelGroup direction="vertical">
        {/* code editor */}
        <Panel defaultSize={65} maxSize={100}>
          <Box height="100%">
            <EditorHeader
              language={language}
              languages={languages}
              onSelectLanguage={onSelectLanguage}
              theme={theme}
              THEMES={THEMES}
              onSelectTheme={onSelectTheme}
              room={room}
            />
            <CodeEditor
              onMount={onMount}
              value={value}
              setValue={setValue}
              language={language}
              roomId={room.roomId}
            />
          </Box>
        </Panel>

        <PanelResizeHandle style={{backgroundColor: "gray", padding: "1px"}}/>

        {/* output window */}
        <Panel defaultSize={40} maxSize={75}>
          <Box height="100%" mt="1">
            <Output language={language} editorRef={editorRef} />
          </Box>
        </Panel>
      </PanelGroup>
    </Box>
  );
}

export default CodeEditorPanel;
