import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const version = pkg.version;

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const run = (command, args, options = {}) => {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    ...options,
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with ${result.status}`);
  }
};

const extensionZip = path.join(dist, `openchamber-trajectory-extension-${version}.zip`);
run("zip", [
  "-r",
  extensionZip,
  "package.json",
  "panel",
  "service",
  "README.md",
  "LICENSE",
]);

run("npm", [
  "pack",
  "./collector",
  "--pack-destination",
  dist,
]);

console.log("\nRelease artifacts:");
for (const name of fs.readdirSync(dist).sort()) {
  const file = path.join(dist, name);
  console.log(`  ${name}  ${fs.statSync(file).size} bytes`);
}
