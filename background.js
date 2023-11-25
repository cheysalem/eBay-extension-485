
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

    // skip urls like "chrome://" to avoid extension error
    if (tab.url?.startsWith("chrome://")) return undefined;

    if (!tab.url?.startsWith("*://*.ebay.com/*")) return undefined;

    // chrome.scripting.insertCSS({
    //     files: ["disappear.css"],
    //     target: { tabId: tab.id },
    // });

    if(changeInfo.status == 'complete');
    {
        chrome.scripting.executeScript({
            files: ["script.js"],
            target: {tabId: tab.id}
        });
    }
    console.log("background");
});
