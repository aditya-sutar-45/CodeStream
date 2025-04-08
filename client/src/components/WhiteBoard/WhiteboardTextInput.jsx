function WhiteboardTextInput({
  inputRef,
  textInput,
  setTextInput,
  handleTextSubmit,
}) {
  return (
    <input
      ref={inputRef}
      style={{
        backgroundColor: "white",
        color: "black",
        position: "absolute",
        left: textInput.x,
        top: textInput.y,
        zIndex: 10,
        fontSize: "20px",
        border: "1px solid gray",
        padding: "4px",
        outline: "none",
      }}
      value={textInput.value}
      onChange={(e) => setTextInput({ ...textInput, value: e.target.value })}
      onBlur={handleTextSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleTextSubmit();
        }
      }}
    />
  );
}

export default WhiteboardTextInput;
