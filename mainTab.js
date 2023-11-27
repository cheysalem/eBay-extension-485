// event listener that will detect when the
// button to edit the Blacklist
// is selected
document.querySelector('#goToOptions').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});



// // event listener that will run constantly as the content in the
// // extension tab populates in order
// // to constantly update click count
// document.addEventListener('DOMContentLoaded', function () {

//   // listen for messages from the background script
//   chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.action === 'update') {
//       document.getElementById('clickCount').textContent = request.clickCount;
//     }
//   });

//   // increment the click count when the button is clicked
//   document.addEventListener('click', function () {
//     chrome.runtime.sendMessage({ action: 'increment' });
//   });

//   // get the current click count from storage and update the popup
//   chrome.storage.sync.get(['clickCount'], function (result) {
//     const clickCount = result.clickCount || 0;
//     document.getElementById('clickCount').textContent = clickCount;
//   });

// });
