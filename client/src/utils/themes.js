import cobaltTheme from "../assets/EditorThemes/Cobalt.json";
import githubDark from "../assets/EditorThemes/GitHub Dark.json";
import allHallowsEve from "../assets/EditorThemes/All Hallows Eve.json"

export const THEMES = ["cobalt", "github-dark", "all-hallows-eve"];

export const defineMonacoThemes = (monaco) => {
  monaco.editor.defineTheme("cobalt", cobaltTheme);
  monaco.editor.defineTheme("github-dark", githubDark);
  monaco.editor.defineTheme("all-hallows-eve", allHallowsEve);
};
