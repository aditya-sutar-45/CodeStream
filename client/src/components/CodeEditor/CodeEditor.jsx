import { Box } from "@radix-ui/themes";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS, EVENTS } from "../../utils/constants";
import socket from "../../socket";
import { useEffect, useRef } from "react";
import "../../css/index.css";

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}


function CodeEditor({ value, onMount, setValue, language, roomId }) {
  const editorInstance = useRef(null); // Monaco editor instance
  const currentCode = useRef(value); // Code value ref

  // Sync code updates from other clients
  useEffect(() => {
    if (!socket || !roomId) return;

    const handleCodeUpdate = (data) => {
      if (
        editorInstance.current &&
        data.userId !== socket.id &&
        currentCode.current !== data.code
      ) {
        currentCode.current = data.code;
        editorInstance.current.setValue(data.code);
      }
    };

    socket.on(EVENTS.CODE.UPDATE, handleCodeUpdate);

    return () => {
      socket.off(EVENTS.CODE.UPDATE, handleCodeUpdate);
    };
  }, [roomId]);

  // Handle editor changes and emit updates
  const handleCodeChange = debounce((newCode) => {
    if (currentCode.current !== newCode) {
      currentCode.current = newCode;
      setValue(newCode);

      if (socket && roomId) {
        socket.emit(EVENTS.CODE.SYNC, {
          roomId,
          code: newCode,
          language,
        });
      }
    }
  }, 150);

  // Set up editor instance reference
  const handleMount = (editor, monaco) => {
    editorInstance.current = editor;
    onMount(editor, monaco);
  };

  // Update currentCode and editor when language changes
  useEffect(() => {
    const langKey = language;
    const defaultSnippet = CODE_SNIPPETS[langKey];

    currentCode.current = defaultSnippet;

    if (editorInstance.current) {
      editorInstance.current.setValue(defaultSnippet);
    }

    setValue(defaultSnippet); // sync with parent
  }, [language, setValue]);

  return (
    <Box height="100%">
      <Editor
        height="100%"
        theme="vs-dark"
        language={language === "c++" ? "cpp" : language}
        value={currentCode.current}
        onMount={handleMount}
        onChange={(val) => handleCodeChange(val)}
      />
    </Box>
  );
}

export default CodeEditor;
