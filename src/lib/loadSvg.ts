import fs from "node:fs";
import path from "node:path";

export function loadSvg(relPath: string): string {
  return fs.readFileSync(path.join(process.cwd(), "src/assets", relPath), "utf-8");
}
