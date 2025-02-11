import { Box } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditor from "./CodeEditor";
import LanguageSelect from "./LanguageSelect";
import { CODE_SNIPPETS } from "../../utils/constants";

function CodeEditorPanel() {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

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
          <LanguageSelect language={language} onSelect={onSelectLanguage} />
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
