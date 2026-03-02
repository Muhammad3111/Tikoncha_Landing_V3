import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outPath = path.join(root, "styles", "legacy-from-export.css");
const fallbackCss = "/* Static fallback stylesheet. */\n";

fs.mkdirSync(path.dirname(outPath), { recursive: true });

if (!fs.existsSync(outPath)) {
  fs.writeFileSync(outPath, fallbackCss, "utf8");
  console.warn(`[sync:export-css] missing stylesheet, created fallback: ${outPath}`);
} else {
  console.log(`[sync:export-css] stylesheet is ready: ${outPath}`);
}
