
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    console.log("background");
    
    // skip urls like "chrome://" to avoid extension error
    if (tab.url?.startsWith("chrome://")) return undefined;

    if(changeInfo.status == 'complete');
    {
        chrome.scripting.executeScript({
            files: ["script.js"],
            target: {tabId: tab.id}
        });
    }
});

