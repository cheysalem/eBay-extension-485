
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

    // skip urls like "chrome://" to avoid extension error
    if (tab.url?.startsWith("chrome://")) return undefined;

    //if (!tab.url?.startsWith("*://*.ebay.com/*")) return undefined;

    if(changeInfo.status == 'complete');
    {
        chrome.scripting.executeScript({
            files: ["script.js"],
            target: {tabId: tab.id}
        });
    }
});

let currCount = 0;

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'increment') {
    // Increment the click count
    currCount++;

    // Save the updated click count to storage
    chrome.storage.sync.set({ clickCount: currCount });

    // Send a message to update the popup
    chrome.runtime.sendMessage({ action: 'update', clickCount: currCount });
  }
});