// Keeps the data analyst honest: every figure in an answer must appear in the dataset text.
// Small whole numbers (counts like "2 regions", months) and the year are not checked.

const NUM = /\d[\d,]*(?:\.\d+)?/g;

function normalise(n: string) {
  const plain = n.replace(/,/g, "");
  return String(Number(plain)); // "0142" -> "142", "95.10" -> "95.1"
}

export function figuresIn(text: string): Set<string> {
  return new Set((text.match(NUM) ?? []).map(normalise));
}

// Figures in `answer` that don't appear anywhere in `data`.
export function ungrounded(answer: string, data: string): string[] {
  const known = figuresIn(data);
  return [...new Set((answer.match(NUM) ?? []).map(normalise))].filter((n) => {
    const v = Number(n);
    if (Number.isInteger(v) && v <= 12) return false;
    if (v === 2026) return false;
    return !known.has(n);
  });
}

// When a question names one or more regions, the answer's figures must come from those regions'
// own lines. This catches the model borrowing a national figure (it once gave Mindanao the
// national 103% achievement instead of its own 100.5%).
export function regionMismatch(question: string, answer: string, data: string, regionNames: string[]): string[] {
  const named = regionNames.filter((r) => new RegExp(`\\b${r}\\b`, "i").test(question));
  if (!named.length) return [];
  const lines = data.split("\n").filter((l) => named.some((r) => l.startsWith(`${r} in August:`)));
  return ungrounded(answer, lines.join("\n"));
}
