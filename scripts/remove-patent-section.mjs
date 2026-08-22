import { readFileSync, writeFileSync } from "node:fs";

const file = "client/src/pages/Home.tsx";
const source = readFileSync(file, "utf8");
const pattern = /\n        <section id="intellectual-property"[\s\S]*?\n        <\/section>\n\n        (?=<section id="muons")/;
const updated = source.replace(pattern, "\n\n        ");

if (updated === source) {
  throw new Error("Patent section boundary was not found; no file changes made.");
}

writeFileSync(file, updated);
console.log("Removed the Intellectual Property section from Home.tsx.");
