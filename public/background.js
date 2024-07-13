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
