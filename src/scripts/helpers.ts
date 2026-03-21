type LyricRecord = {
  lyric: string;
};

type LyricsApiResponse = {
  data: LyricRecord[];
};

const getCopyButton = (): HTMLButtonElement => {
  const copyButton = document.querySelector<HTMLButtonElement>("#copy");

  if (copyButton === null) {
    throw new Error("Copy button not found");
  }

  return copyButton;
};

const getPasswordTextarea = (): HTMLTextAreaElement => {
  const passwordTextarea =
    document.querySelector<HTMLTextAreaElement>("textarea#password");

  if (passwordTextarea === null) {
    throw new Error("Password textarea not found");
  }

  return passwordTextarea;
};

const showError = (): void => {
  const copyButton = getCopyButton();
  copyButton.disabled = true;
  copyButton.textContent = "error";

  const passwordTextarea = getPasswordTextarea();
  passwordTextarea.value =
    "Something went wrong!\nPlease try reloading your browser.";
  passwordTextarea.classList.add("error");
};

export const generatePassword = (): void => {
  const passwordTextarea = getPasswordTextarea();

  try {
    const newPassword = window.lyricalPasswordGenerator.generate();
    passwordTextarea.readOnly = false;
    passwordTextarea.value = newPassword;
    passwordTextarea.readOnly = true;
  } catch {
    showError();
  }
};

const resetCopyButton = (): void => {
  const copyButton = getCopyButton();
  copyButton.disabled = false;
  copyButton.textContent = "Copy";
  copyButton.classList.remove("copied");
};

export const copyPassword = (): void => {
  const textValue = getPasswordTextarea().value;

  navigator.clipboard.writeText(textValue).then(() => {
    const copyButton = getCopyButton();
    copyButton.disabled = true;
    copyButton.textContent = "✓";
    copyButton.classList.add("copied");
    window.setTimeout(resetCopyButton, 200);
  });
};

export const fetchLyrics = async (): Promise<string[]> => {
  const response = await fetch("https://api.leet-lyrics.com/lyrics");
  const payload = (await response.json()) as LyricsApiResponse;

  return payload.data.map((entry) => entry.lyric);
};
