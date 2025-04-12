import { Box } from "@radix-ui/themes";
import { Editor } from "@monaco-editor/react";
import { CODE_SNIPPETS, EVENTS } from "../../utils/constants";
import socket from "../../socket";
import { useEffect, useRef } from "react";

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function getRandomColor() {
  const colors = [
    "#f87171",
    "#34d399",
    "#60a5fa",
    "#fbbf24",
    "#a78bfa",
    "#f472b6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

const userColors = {}; // userId -> color
const userNames = {}; // userId -> name

function CodeEditor({
  value,
  onMount,
  setValue,
  language,
  roomId,
  displayName,
}) {
  const editorInstance = useRef(null);
  const cursorDecorations = useRef({}); // userId -> decorationsCollection

  useEffect(() => {
    if (!socket || !roomId) return;

    const handleCodeUpdate = (data) => {
      if (!editorInstance.current || data.userId === socket.id) return;

      const currentValue = editorInstance.current.getValue();
      if (currentValue !== data.code) {
        const currentSelection = editorInstance.current.getSelection(); // Save cursor position

        editorInstance.current.setValue(data.code); // Set code directly, not via setValue()

        editorInstance.current.setSelection(currentSelection); // Restore cursor
      }
    };

    const handleCursorMove = (data) => {
      if (!editorInstance.current || data.userId === socket.id) return;

      const { lineNumber, column, userId, name } = data.position;

      const editor = editorInstance.current;
      const monaco = window.monaco;

      if (!userColors[userId]) userColors[userId] = getRandomColor();
      if (!userNames[userId]) userNames[userId] = name || "Anon";

      const color = userColors[userId];
      const label = userNames[userId];

      // Remove old decoration
      if (cursorDecorations.current[userId]) {
        cursorDecorations.current[userId].clear(); // Properly clears collection
      }

      const range = new monaco.Range(lineNumber, column, lineNumber, column);
      const options = {
        className: "remote-cursor",
        afterContentClassName: `remote-cursor-label-${userId}`,
        stickiness:
          monaco.editor.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
      };

      // create new decorations collection
      const decorations = editor.createDecorationsCollection([
        { range, options },
      ]);

      cursorDecorations.current[userId] = decorations;

      // Add label style only once per user
      const styleId = `cursor-style-${userId}`;
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
      .monaco-editor .remote-cursor-label-${userId}::after {
        content: "${label}";
        background: ${color};
        color: white;
        padding: 1px 6px;
        border-radius: 4px;
        font-size: 12px;
        margin-left: 4px;
        position: relative;
        top: -1px;
        white-space: nowrap;
      }
    `;
        document.head.appendChild(style);
      }
    };

    socket.on(EVENTS.CODE.UPDATE, handleCodeUpdate);
    socket.on(EVENTS.CODE.CURSOR_MOVE, handleCursorMove);

    return () => {
      socket.off(EVENTS.CODE.UPDATE, handleCodeUpdate);
      socket.off(EVENTS.CODE.CURSOR_MOVE, handleCursorMove);
    };
  }, [roomId, setValue]);

  const handleCodeChange = debounce((newCode) => {
    setValue(newCode);

    if (socket && roomId && editorInstance.current) {
      socket.emit(EVENTS.CODE.SYNC, {
        roomId,
        code: newCode,
        language,
      });

      const position = editorInstance.current.getPosition();
      socket.emit(EVENTS.CODE.CURSOR_MOVE, {
        roomId,
        position: {
          lineNumber: position.lineNumber,
          column: position.column,
          userId: socket.id,
          name: displayName,
        },
      });
    }
  }, 10);

  const handleMount = (editor, monaco) => {
    editorInstance.current = editor;
    onMount(editor, monaco);

    editor.onDidChangeCursorPosition((e) => {
      const position = e.position;
      if (socket && roomId) {
        socket.emit(EVENTS.CODE.CURSOR_MOVE, {
          roomId,
          position: {
            lineNumber: position.lineNumber,
            column: position.column,
            userId: socket.id,
            name: displayName,
          },
        });
      }
    });
  };

  return (
    <Box height="100%">
      <Editor
        height="100%"
        theme="vs-dark"
        language={language === "c++" ? "cpp" : language}
        defaultValue={CODE_SNIPPETS[language]}
        value={value}
        onMount={handleMount}
        onChange={(val) => handleCodeChange(val)}
      />
    </Box>
  );
}

export default CodeEditor;
