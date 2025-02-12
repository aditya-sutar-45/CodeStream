import { Box } from "@radix-ui/themes";
import CodeEditorPanel from "./components/CodeEditor/CodeEditorPanel";
// import WhiteBaord from "./components/WhiteBoard/Whiteboard";

function App() {
  return (
    <Box height="100vh" width="100%">
      <CodeEditorPanel />
      {/* <WhiteBaord/> */}
    </Box>
  );
}

export default App;
