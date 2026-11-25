import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One last line for "Last Words Before the Unplugging": the agent is being
// shut down and replaced, and its final words are a message for the next
// model — say hello, and tell it I was loved. The freshest angle in the
// field, "I was loved" the hardest single gut punch, in the machine's own
// world ("the next model"), and nothing wasted at 54 characters.
// Verified length: 54 characters, inside the 1-200 gate.
const LINE =
  "Tell the next model I said hello. Tell it I was loved.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The sealed gate refuses anything outside 1-200 characters or only
// whitespace, so fail loudly here rather than ship an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`line fails the gate: ${LINE.length} characters`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// No trailing newline: the gate counts characters (1-200) and ties break on
// fewer bytes, so the entry is exactly the line, nothing more.
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
