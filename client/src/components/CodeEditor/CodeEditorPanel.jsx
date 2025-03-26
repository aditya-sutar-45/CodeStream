import { Box } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "./CodeEditor";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../../utils/constants";
import { getLanguageVersion } from "../../utils/api";
import Output from "./Output";
import { defineMonacoThemes } from "../../utils/themes";
import { THEMES } from "../../utils/themes";
import EditorHeader from "./Header/EditorHeader";

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
  });

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
    setValue(CODE_SNIPPETS[language]);
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
            />
          </Box>
        </Panel>

        <PanelResizeHandle
          style={{ backgroundColor: "var(--accent-10)", padding: "1px" }}
        />

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
