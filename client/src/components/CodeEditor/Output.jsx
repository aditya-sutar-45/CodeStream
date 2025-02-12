import { useState } from "react";
import { executeCode } from "../../utils/api";
import { Text, Box, Flex, Button } from "@radix-ui/themes";

function Output({ editorRef, language }) {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box height="100%">
      <Flex p="1">
        <Box p="1" mx="1">
          <Text size="4" align="left" weight="medium">
            Output
          </Text>
        </Box>
        <Button
          onClick={runCode}
          {...(isLoading && { loading: true })}
          variant="surface"
        >
          Run Code
        </Button>
      </Flex>
      <Box
        height="80%"
        p="2"
        mx="1"
        style={{
          border: "1px solid",
          borderColor: isError ? "red" : "grey",
          color: isError ? "red" : "grey",
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
