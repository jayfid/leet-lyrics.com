const showError = () => {
  const copyButton = document.querySelector("#copy");
  copyButton.setAttribute("disabled", true);
  copyButton.innerHTML = "error";
  const passwordTextarea = document.querySelector("textarea#password");
  passwordTextarea.value =
    "Something went wrong!\nPlease try reloading your browser.";
  passwordTextarea.classList.add("error");
};

export const generatePassword = () => {
  const passwordTextarea = document.querySelector("textarea#password");
  try {
    const newPassword = window.lyricalPasswordGenerator.generate();
    passwordTextarea.setAttribute("readonly", false);
    passwordTextarea.value = newPassword;
    passwordTextarea.setAttribute("readonly", true);
  } catch (error) {
    showError();
  }
};

const resetCopyButton = () => {
  const copyButton = document.querySelector("#copy");
  copyButton.removeAttribute("disabled");
  copyButton.innerHTML = "Copy";
  copyButton.classList.remove("copied");
};

export const copyPassword = () => {
  const textValue = document.querySelector("textarea#password").value;
  navigator.clipboard.writeText(textValue).then(() => {
    const copyButton = document.querySelector("#copy");
    copyButton.setAttribute("disabled", true);
    copyButton.innerHTML = "✓";
    copyButton.classList.add("copied");
    setTimeout(resetCopyButton, 200);
  });
};

export const fetchLyrics = async () => {
  const resp = new Request("https://api.leet-lyrics.com/lyrics");
  return fetch(resp)
    .then((response) => response.json())
    .then((response) => {
      const lyrics = [];
      response.data.forEach((lyric) => {
        lyrics.push(lyric.lyric);
      });
      return lyrics;
    });
};
