import { useState } from "react";
import { executeCode } from "../../utils/api";
import { Text, Box, Flex, Button, TextField } from "@radix-ui/themes";

function Output({ editorRef, language }) {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [showInputField, setShowInputField] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const result = await executeCode(language, sourceCode, userInput);
      const stdout = result.run.stdout || "";
      const stderr = result.run.stderr || "";
      setIsError(!!stderr);
      const combinedOutput = (stdout + "\n" + stderr).trim().split("\n");
      setOutput(combinedOutput);
    } catch (err) {
      console.log(err);
      setIsError(true);
      setOutput(["Error executing code: " + err.message]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box height="100%">
      <Flex p="1" justify="between">
        <Box p="1" mx="1">
          <Text size="4" align="left" weight="medium">
            Output
          </Text>
        </Box>
        <Flex gap="2">
          <Button
            onClick={() => setShowInputField(!showInputField)}
            variant="soft"
          >
            {showInputField ? "Hide Input" : "Show Input"}
          </Button>
          <Button
            onClick={runCode}
            {...(isLoading && { loading: true })}
            variant="surface"
          >
            Run Code
          </Button>
        </Flex>
      </Flex>

      {showInputField && (
        <Box p="2" mx="1" mb="2">
          <TextField.Root
            placeholder="Enter input for your code here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{ width: "100%" }}
            size="2"
          />
          <Text as="p" size="1" color="gray">
            This input will be passed to your code when it runs
          </Text>
        </Box>
      )}

      <Box
        height={showInputField ? "60%" : "80%"}
        p="2"
        mx="1"
        style={{
          border: "1px solid",
          borderColor: isError ? "red" : "grey",
          color: isError ? "red" : "grey",
          overflow: "scroll",
        }}
      >
        {output
          ? output.map((l, i) => (
              <Text as="div" key={i}>
                {l}
              </Text>
            ))
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
}

export default Output;
