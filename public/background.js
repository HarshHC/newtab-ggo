/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ replaceImages: false });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.storage.sync.get(["replaceImages"], (result) => {
      chrome.tabs.sendMessage(tabId, { replaceImages: result.replaceImages });
    });
  }
});

chrome.omnibox.onInputEntered.addListener((text, disposition) => {
  // Base URL for ChatGPT search
  const chatgptUrl = "https://chat.openai.com/?q=";

  const searchUrl = `${chatgptUrl}${encodeURIComponent(text)}`;

  // Open the URL in a new tab
  chrome.tabs.create({ url: searchUrl });
});
