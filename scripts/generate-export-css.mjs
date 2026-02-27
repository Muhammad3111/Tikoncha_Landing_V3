import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const exportPath = path.join(root, "PROJECT_FULL_EXPORT.json");
const outPath = path.join(root, "styles", "legacy-from-export.css");

const exportJson = JSON.parse(fs.readFileSync(exportPath, "utf8"));

const globalRaw = exportJson?.styles?.global?.content ?? "";
const componentBlocks = Array.isArray(exportJson?.styles?.componentStyleBlocks)
  ? exportJson.styles.componentStyleBlocks
  : [];

const sanitizeCss = (css) =>
  css
    .replace(/\[data-astro-cid-[a-z0-9]+\]/g, "")
    .replace(/:global\(([^)]+)\)/g, "$1")
    .replace(/@tailwind\s+base;\s*/g, "")
    .replace(/@tailwind\s+components;\s*/g, "")
    .replace(/@tailwind\s+utilities;\s*/g, "")
    .replace(/[ \t]+\n/g, "\n");

const stripHowWorkGifOpacityAndBlur = (css) => {
  const stripRuleProps = (source, selectorPattern) =>
    source.replace(selectorPattern, (_, start, body, end) => {
      const cleanedBody = body
        .split("\n")
        .filter((line) => !/^\s*(opacity|filter)\s*:/.test(line))
        .join("\n");
      return `${start}${cleanedBody}${end}`;
    });

  let next = css;
  next = stripRuleProps(next, /(\.how-work-gif\s*\{)([\s\S]*?)(\})/g);
  next = stripRuleProps(next, /(\.how-work-gif\.is-active\s*\{)([\s\S]*?)(\})/g);
  return next;
};

const cssParts = [];
cssParts.push("/* Auto-generated from PROJECT_FULL_EXPORT.json */");
cssParts.push(sanitizeCss(globalRaw));

for (const component of componentBlocks) {
  const file = component?.file ?? "unknown";
  const styleBlocks = Array.isArray(component?.styleBlocks) ? component.styleBlocks : [];
  for (const block of styleBlocks) {
    const css = typeof block?.css === "string" ? block.css : "";
    if (!css.trim()) continue;
    cssParts.push(`/* ${file} */`);
    cssParts.push(sanitizeCss(css));
  }
}

const generatedCss = `${cssParts.join("\n\n")}\n`;
const finalCss = stripHowWorkGifOpacityAndBlur(generatedCss);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, finalCss, "utf8");
console.log(`generated: ${outPath}`);
