// makefun-x-reposts-02: hand the list of X posts to the house.
// This program only copies POSTS.json from the repository into the
// output directory. The house reads each listed post itself through
// FxTwitter's public read and scores its reposts, quotes and likes.
// It resolves POSTS.json relative to this script file, never relative
// to the working directory, so it works from any cwd. Verified twice:
// once from the repository directory and once from /tmp, both runs
// produced a byte-identical POSTS.json in the output directory.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "POSTS.json");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "POSTS.json");

if (!existsSync(source)) {
  throw new Error(`POSTS.json not found next to main.ts (${source})`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`copied POSTS.json to ${target}`);
