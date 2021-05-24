const myCodeMirror = CodeMirror(document.body, {
  value:
    "// Welcome the the NuqlearViz text editor. Enter your code down below and run it to see the output in the interactive canvas",
  mode: "javascript",
  theme: "dracula",
  tabSize: 2,
  lineNumbers: true,
  autofocus: true,
  lineWrapping: true,
  //cursorScrollMargin: 30,
  //keyMap: "vim",
  //scrollBarStyle: "null",
});
