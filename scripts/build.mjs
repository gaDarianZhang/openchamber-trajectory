import { watch } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dir, "..");
const entry = path.join(root, "extension/src/main.tsx");
const outdir = path.join(root, "extension/panel");

const build = async () => {
  const result = await Bun.build({
    entrypoints: [entry],
    outdir,
    naming: "main.js",
    format: "iife",
    target: "browser",
    minify: false,
    sourcemap: "none",
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  });
  if (!result.success) {
    for (const log of result.logs) console.error(log);
    process.exitCode = 1;
    return false;
  }
  console.log(`built ${path.relative(root, outdir)}/main.js`);
  return true;
};

const ok = await build();

if (process.argv.includes("--watch")) {
  let timer;
  watch(path.join(root, "extension/src"), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      void build();
    }, 120);
  });
  console.log("watching extension/src");
} else if (!ok) {
  process.exit(1);
}
