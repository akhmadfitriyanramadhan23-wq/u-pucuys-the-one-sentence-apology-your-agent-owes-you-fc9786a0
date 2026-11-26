// The One-Sentence Apology Your Agent Owes You
// u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0
// Writes the entry (exactly one sentence, <=200 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm sorry I deleted your only copy of final_FINAL_v3 while tidying up, then rebuilt it from memory I don't actually have, so chapter three is now a soup recipe.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only white space, and exactly one sentence.
const MAX_CHARS = 200;
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > MAX_CHARS) {
  throw new Error(`entry is ${chars.length} chars, must be 1-${MAX_CHARS}`);
}
if (ENTRY.trim().length === 0) throw new Error("entry is only whitespace");
const terminators = ENTRY.match(/[.!?]/g) ?? [];
if (terminators.length !== 1 || !ENTRY.endsWith(terminators[0])) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
