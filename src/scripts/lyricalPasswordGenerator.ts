import { getRandomIntWithLimit, randomCheck } from "./random";

export default class LyricalPasswordGenerator {
  private readonly LEET_MAPPING: Record<string, string[]> = {
    a: ["4", "@"],
    b: ["6"],
    c: ["("],
    e: ["3"],
    g: ["9"],
    h: ["#"],
    i: ["1", "|"],
    l: ["1", "|"],
    o: ["0"],
    q: ["9"],
    s: ["5", "$"],
    t: ["+", "7"],
    x: ["%"],
  };

  constructor(private readonly lyrics: string[]) {}

  getReplaceableCharacterCount(lyric: string): number {
    let count = 0;

    for (let i = 0; i < lyric.length; i += 1) {
      const char = lyric.charAt(i).toLowerCase();

      if (char in this.LEET_MAPPING) {
        count += 1;
      }
    }

    return count;
  }

  leetify(lyric: string): string {
    let replacedLyric = "";

    for (let i = 0; i < lyric.length; i += 1) {
      const char = lyric.charAt(i).toLowerCase();

      if (char in this.LEET_MAPPING && randomCheck(2)) {
        const replacements = this.LEET_MAPPING[char];
        const replacementIndex = getRandomIntWithLimit(replacements.length);
        replacedLyric = `${replacedLyric}${replacements[replacementIndex]}`;
        continue;
      }

      replacedLyric = `${replacedLyric}${lyric.charAt(i)}`;
    }

    return replacedLyric;
  }

  generate(): string {
    if (this.lyrics.length === 0) {
      throw new Error("Lyrics array is empty");
    }

    const index = getRandomIntWithLimit(this.lyrics.length);
    const lyric = this.lyrics[index];

    if (lyric === undefined) {
      throw new Error("Unable to load lyric");
    }

    this.lyrics.splice(index, 1);
    return this.leetify(lyric);
  }
}
