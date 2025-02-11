import { Box } from "@radix-ui/themes";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../../utils/constants";

function CodeEditor({ value, onMount, setValue, language }) {
  return (
    <Box height="100%">
      <Editor
        height="100%"
        theme="vs-dark"
        language={language === "c++" ? "cpp" : language}
        defaultValue={CODE_SNIPPETS[language]}
        value={value}
        onMount={onMount}
        onChange={(val) => setValue(val)}
      />
    </Box>
  );
}

export default CodeEditor;
