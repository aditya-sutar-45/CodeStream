import { Box } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "./CodeEditor";
import LanguageSelect from "./LanguageSelect";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../../utils/constants";
import { getLanguageVersion } from "../../utils/api";

function CodeEditorPanel() {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [languages, setLanguages] = useState({});

  useEffect(() => {
    const updateLanguageVersions = async () => {
      const updatedVersions = {};
      for (const lang in LANGUAGE_VERSIONS) {
        updatedVersions[lang] = await getLanguageVersion(lang);
        LANGUAGE_VERSIONS[lang] = await getLanguageVersion(lang);
      }
      setLanguages(Object.entries(updatedVersions));
    };
    updateLanguageVersions();
  }, []);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelectLanguage = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box height="100vh" width="100%">
      <PanelGroup direction="vertical">
        {/* code editor */}
        <Panel defaultSize={50} maxSize={75}>
          <LanguageSelect
            languages={languages}
            language={language}
            onSelect={onSelectLanguage}
          />
          <CodeEditor
            onMount={onMount}
            value={value}
            setValue={setValue}
            language={language}
          />
        </Panel>

        <PanelResizeHandle />

        {/* output window */}
        <Panel defaultSize={50} maxSize={75}>
          <Box
            style={{
              height: "100%",
              background: "#3c4048",
              color: "white",
            }}
          >
            Bottom Panel
          </Box>
        </Panel>
      </PanelGroup>
    </Box>
  );
}

export default CodeEditorPanel;
