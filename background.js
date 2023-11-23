// NMSU CS485 Fall 2023 Final Project

//this is our background worker

//const ebay = '*://*.ebay.com/*';

chrome.tabs.onUpdated.addEventListener(function(tabId, changeInfo, tab){
    if(changeInfo.status == 'complete')
    {
        chrome.scripting.executeScript({
            files: ["script.js"],
            target: {tabId: tab.id}
        })
    }
});

console.log("background");
