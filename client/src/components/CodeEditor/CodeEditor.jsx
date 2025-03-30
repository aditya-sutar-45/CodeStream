import { Box } from "@radix-ui/themes";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS } from "../../utils/constants";
import { EVENTS } from "../../utils/constants";
import socket from "../../socket";
import { useEffect } from "react";

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
  useEffect(() => {
    if (!socket || !roomId) return;
    const handleCodeUpdate = (data) => {
      if (data.userId !== socket.id) {
        setValue(data.code);
      }
    };
    socket.on(EVENTS.CODE.UPDATE, handleCodeUpdate); 
    return () => {
      socket.off(EVENTS.CODE.UPDATE, handleCodeUpdate);
    }
  }, [roomId, setValue]);

  const handleCodeChange = debounce((newCode) => {
    setValue(newCode);
    if (socket && roomId) {
      socket.emit(EVENTS.CODE.SYNC, {
        roomId,
        code: newCode,
        language,
      });
    }
  }, 20);

  return (
    <Box height="100%">
      <Editor
        height="100%"
        theme="vs-dark"
        language={language === "c++" ? "cpp" : language}
        defaultValue={CODE_SNIPPETS[language]}
        value={value}
        onMount={onMount}
        onChange={(val) => handleCodeChange(val)}
      />
    </Box>
  );
}

export default CodeEditor;
