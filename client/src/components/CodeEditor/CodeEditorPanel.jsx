import { Box, Flex } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "./CodeEditor";
import LanguageSelect from "./LanguageSelect";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../../utils/constants";
import { getLanguageVersion } from "../../utils/api";
import Output from "./Output";
import ThemeSelect from "./ThemeSelect";

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
        <Panel defaultSize={65} maxSize={100}>
          <Box height="100%">
            <Flex p="1">
              <LanguageSelect language={language} languages={languages} onSelect={onSelectLanguage}/>
              <ThemeSelect />
            </Flex>
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
