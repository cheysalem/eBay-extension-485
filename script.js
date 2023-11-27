        console.log("---Screen Content Script---");

        chrome.storage.sync.get(
        {
            sellersArray: [],
        },
        function (items) {
            replacePageWords(items.sellersArray);
        }
        );

        function replacePageWords(sellersArray) {
        // for loop to iterate through the
        // Blacklist and run a method
        // to hide information associated with the
        // sellers
        for (var i = 0; i < sellersArray.length; i++) {
            replaceWord(sellersArray[i]);
        }
        } // end replacePageWords

        function replaceWord(obj) {
        // get a query that will give us all of the content
        // on the screen that belong to the
        // following HTML tags
        var allElems = document.querySelectorAll(".s-item__wrapper.clearfix");

        // variable to store the matching listing title
        var matchingTitle = null;

        // for loop to iterate through all content
        // found on the page
        for (var i = 0; i < allElems.length; i++) {
            // check if there is a match between seller name and
            // content on the screen
            if (isSellerMatch(allElems[i], obj)) {
            // store the listing title for later use
            matchingTitle = getListingTitle(allElems[i]);

            if (obj.type == "0") {
                // call remove other listings with the same title
                removeAllOtherListings(allElems, matchingTitle);
            } else {
                // call apply blur to other listings with the same title
                applyBlurToOtherListings(allElems, matchingTitle);
            }
            }
        }
        } // end replaceWords

        function isSellerMatch(element, obj) {
        var sellerNameElement =
            element.querySelector(".s-item__wrapper.clearfix") ||
            element.querySelector(".s-item__seller-info");
        // cool way to check seller and get them all
        var allSellerElements = document.querySelectorAll(".s-item__wrapper.clearfix");

        if (sellerNameElement) {
            var sellerName = sellerNameElement.innerText.toLowerCase();
            var storedSellerName = obj.seller.toLowerCase();

            // Check if the seller name in sellersArray matches
            // or if the seller's name is found in the listing
            return (
            sellerName.includes(storedSellerName) ||
            storedSellerName.includes(sellerName)
            );
        }
        return false;
        }
          

        function getListingTitle(element) {
        // get the listing title from the element
        var titleElement = element.querySelector(".s-item__title");
        //   console.log("Title Name: " + titleElement);
        return titleElement ? titleElement.innerText : "";
        }

        function removeAllOtherListings(allElems, title) {
        // remove all listings with the same title
        for (var i = 0; i < allElems.length; i++) {
            var currentTitle = getListingTitle(allElems[i]);
            if (currentTitle === title) {
            allElems[i].remove();
            }
        }
        }

        function applyBlurToOtherListings(allElems, title) {
        // apply blur to all listings with the same title
        for (var i = 0; i < allElems.length; i++) {
            var currentTitle = getListingTitle(allElems[i]);
            if (currentTitle === title) {
            allElems[i].style.filter = "blur(8px)";
            }
        }
        }

        // //function for counting clicks
        // //i would implement a switch to turn this on/off
        // document.addEventListener("click", function () {
        //   // Do what you want with click event
        //   console.log("click");
        //   //increment a value
        //   //save that value to local storage (idk how that works)

        //   // Send a message to the background script to increment the click count
        //   // or at least it should, but each time I try it I get
        //   // an error in chrome developer IDE:
        //   // "Uncaught Error: Extension context invalidated."

        //   // commented out for now
        //   //chrome.runtime.sendMessage({ action: 'increment' });
        // });
