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

  // If the input starts with 'g ', redirect to ChatGPT
  if (text.startsWith("g ")) {
    const query = text.slice(2).trim();
    const searchUrl = `${chatgptUrl}${encodeURIComponent(query)}`;

    // Open the URL in a new tab
    chrome.tabs.create({ url: searchUrl });
  } else {
    // Handle other cases or default search behavior
    console.log('Searching with Google, Query does not start with "g "');
  }
});
