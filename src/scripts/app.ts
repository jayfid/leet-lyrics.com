import { copyPassword, fetchLyrics, generatePassword } from "./helpers";
import LyricalPasswordGenerator from "./lyricalPasswordGenerator";

declare global {
  interface Window {
    lyricalPasswordGenerator: LyricalPasswordGenerator;
  }
}

void fetchLyrics().then((lyrics) => {
  if (window.lyricalPasswordGenerator === undefined) {
    window.lyricalPasswordGenerator = new LyricalPasswordGenerator(lyrics);
  }

  const reloadButton = document.querySelector<HTMLDivElement>(".reload");
  const copyButton = document.querySelector<HTMLButtonElement>("#copy");

  reloadButton?.addEventListener("click", generatePassword);
  copyButton?.addEventListener("click", copyPassword);

  generatePassword();
});
