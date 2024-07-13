/*global chrome*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.replaceImages !== undefined) {
    replaceImages(message.replaceImages);
  }
});

chrome.storage.sync.get(["replaceImages"], (result) => {
  replaceImages(result.replaceImages);
});

const getCatImage = async () => {
  const catImageApi = "https://api.thecatapi.com/v1/images/search";

  try {
    const response = await fetch(catImageApi);
    const data = await response.json();
    return data[0].url;
  } catch (error) {
    console.error("Error fetching cat image:", error);
  }
};

const replaceImages = (shouldReplace) => {
  document.querySelectorAll("img").forEach((img) => {
    if (shouldReplace) {
      if (!img.hasAttribute("data-original-src")) {
        img.setAttribute("data-original-src", img.src);
      }
      img.src = chrome.runtime.getURL(getCatImage());
    } else {
      if (img.hasAttribute("data-original-src")) {
        img.src = img.getAttribute("data-original-src");
        img.removeAttribute("data-original-src");
      }
    }
  });
};
