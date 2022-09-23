import { getRandomIntWithLimit, randomCheck } from "./random";

class LyricalPasswordGenerator {
  LEET_MAPPING = {
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

  constructor(lyricsList) {
    this.lyrics = lyricsList;
  }

  getReplaceableCharacterCount(lyric) {
    let count = 0;
    for (let i = 0; i < lyric.length; i += 1) {
      const char = lyric.charAt(i).toLowerCase();
      if (char in this.LEET_MAPPING) {
        count += 1;
      }
    }
    return count;
  }

  leetify(lyric) {
    let replacedLyric = "";
    for (let i = 0; i < lyric.length; i += 1) {
      const char = lyric.charAt(i).toLowerCase();
      if (char in this.LEET_MAPPING && randomCheck(2)) {
        const replacementIndex = getRandomIntWithLimit(
          this.LEET_MAPPING[char].length
        );
        replacedLyric = `${replacedLyric}${this.LEET_MAPPING[char][replacementIndex]}`;
      } else {
        replacedLyric = `${replacedLyric}${lyric.charAt(i)}`;
      }
    }
    return replacedLyric;
  }

  generate() {
    // pop random entry from list
    if (!this.lyrics.length) {
      throw new Error("Lyrics array is empty");
    }
    const index = getRandomIntWithLimit(this.lyrics.length);
    const lyric = this.lyrics[index];
    this.lyrics.splice(index, 1);
    return this.leetify(lyric);
  }
}

export default LyricalPasswordGenerator;
