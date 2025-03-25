import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/",
});

export const getLanguageVersion = async (language) => {
  try {
    const res = await API.get("/piston/runtimes");
    const runtime = res.data.find((r) => r.language === language);
    if (runtime) return runtime.version;
    else return null;
  } catch (error) {
    console.log(`error while fetching ${language} version: ${error.message}`);
  }
};

export const executeCode = async (language, sourceCode) => {
  try {
    const res = await API.post("/piston/execute", {
      language,
      version: LANGUAGE_VERSIONS[language] || "latest",
      files: [{ name: "main", content: sourceCode }],
      stdin: "", // Add empty stdin
      args: [], // Add empty args
    });
    return res.data;
  } catch (error) {
    console.error("Execution Error: ", error.response?.data || error.message);
    throw error;
  }
};
