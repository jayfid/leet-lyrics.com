import LyricalPasswordGenerator from "./lyricalPasswordGenerator";
import { copyPassword, fetchLyrics, generatePassword } from "./helpers";

// fetch list of lyrics
fetchLyrics().then((lyrics) => {
  // pass lyrics to instance of PW generator
  if (!window.lyricalPasswordGenerator) {
    window.lyricalPasswordGenerator = new LyricalPasswordGenerator(lyrics);
  }

  // on reload button press, regenerate password
  document.querySelector(".reload").addEventListener("click", generatePassword);

  // on copy button press, copy contents to clipboard
  document.querySelector("#copy").addEventListener("click", copyPassword);

  // generate initial password
  generatePassword();
});
