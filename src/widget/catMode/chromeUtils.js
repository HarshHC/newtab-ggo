import axios from "axios";

/*global chrome*/
chrome.runtime.onInstalled?.addListener(() => {
  chrome.storage?.sync.set({ replaceImages: false });
});

chrome.tabs?.onUpdated?.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    chrome.storage?.sync.get(["replaceImages"], (result) => {
      chrome.tabs.sendMessage(tabId, { replaceImages: result.replaceImages });
    });
  }
});

chrome.runtime?.onMessage?.addListener((message, sender, sendResponse) => {
  if (message.replaceImages !== undefined) {
    replaceImages(message.replaceImages);
  }
});

chrome?.storage?.sync.get(["replaceImages"], (result) => {
  replaceImages(result.replaceImages);
});

const getCatImage = async () => {
  const catImageApi = "https://api.thecatapi.com/v1/images/search";

  const response = await axios.get(catImageApi);
  return response.data[0].url;
};

function replaceImages(shouldReplace) {
  document.querySelectorAll("img").forEach((img) => {
    if (shouldReplace) {
      if (!img.hasAttribute("data-original-src")) {
        img.setAttribute("data-original-src", img.src);
      }
      img.src = chrome.runtime.getURL(getCatImage());
      if (img.hasAttribute("data-original-src")) {
        img.src = img.getAttribute("data-original-src");
        img.removeAttribute("data-original-src");
      }
    }
  });
}
