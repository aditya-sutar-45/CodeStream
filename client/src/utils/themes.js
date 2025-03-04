import cobaltTheme from "../assets/EditorThemes/Cobalt.json";
import githubDark from "../assets/EditorThemes/GitHub Dark.json";
import allHallowsEve from "../assets/EditorThemes/All Hallows Eve.json";
import clouds from "../assets/EditorThemes/Clouds.json";
import githubLight from "../assets/EditorThemes/GitHub Light.json";
import monokai from "../assets/EditorThemes/Monokai.json";
import nord from "../assets/EditorThemes/Nord.json";

export const THEMES = [
  "cobalt",
  "github-dark",
  "all-hallows-eve",
  "clouds",
  "github-light",
  "monokai",
  "nord",
];

export const defineMonacoThemes = (monaco) => {
  monaco.editor.defineTheme("cobalt", cobaltTheme);
  monaco.editor.defineTheme("github-dark", githubDark);
  monaco.editor.defineTheme("all-hallows-eve", allHallowsEve);
  monaco.editor.defineTheme("clouds", clouds);
  monaco.editor.defineTheme("github-light", githubLight);
  monaco.editor.defineTheme("monokai", monokai);
  monaco.editor.defineTheme("nord", nord);
};
