console.log("---Screen Content Script---")

// fetch the list of sellers stored
// in chrome storage to then run
// a function that will hide information
// for that seller
chrome.storage.sync.get({
    sellersArray: []
}, function(items){
    replacePageWords(items.sellersArray);
});

function replacePageWords(sellersArray)
{

    // for loop to iterate through the
    // Blacklist and run a method
    // to hide information associated with the
    // sellers
    for(var i = 0; i < sellersArray.length; i++)
    {
        replaceWord(sellersArray[i]);
    }
}

function replaceWord(obj)
{

    // get a query that will give us all of the content
    // on the screen that belong to the 
    // following HTML tags
    var allElems = document.querySelectorAll('h1, h2, h3, h4, h5, p, a, caption, span, td, div, article');

    // for loop to iterate through all content
    // found on the page
    for(var i = 0; i < allElems.length; i++)
    {
        // check if there is a match between seller name and 
        // content on the screen
        if(allElems[i].innerText.toLowerCase().includes(obj.seller.toLowerCase()))
        {
            if(obj.type == '0')
            {
                // remove (main one needed)

                // Not reliable. Removes ALL items on the
                // screen if seller name is found
                //allElems[i].style.display = 'none';

                // tried to implement David's function using
                // following two methods. Neither gave
                // noticeable results on screen. Could be using
                // function wrong
                //disappear(allElems[i]);

                //var remItem = allElems[i].target;
                //disappear(remItem);

                // original remove code, which just removes the seller name from the item
                allElems[i].innerHTML = allElems[i].innerHTML.replace(obj.seller, '');
            }
            else if((obj.type == '1'))
            {
                // blur
                allElems[i].style.color = 'transparent';
                allElems[i].style.textShadow = '0 0 8px rgba(0,0,0,0.5)';
            }
        }
    }

}

//will make the sponsored stuff disappear for now
function disappear(target){

    var targets = document.querySelectorAll(target);

    for (var i = 0; i < targets.length; i++){
        targets[i].style.display = 'none';
        //was trying something
        targets[i].classesList.add("make_disappear");
    }
}
//disappear('.x-ads-placements,.x-merch-nori'); //sponsored content class

// this method for removing elements is more effective (thank u shinigami eyes)
//takes a css script as a string parameter and adds it to the page
function addStyleSheet(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}
//call the function to add a style sheet that removes sponsored content
//.x-ads-placements,.x-merch-nori are the classes of the elements we want to block
addStyleSheet(`
.x-ads-placements,.x-merch-nori{
    display: none !important;
}`
);

//function for counting clicks
//i would implement a switch to turn this on/off
document.addEventListener("click", function() {
    // Do what you want with click event
    console.log('click');
    //increment a value
    //save that value to local storage (idk how that works)

    // Send a message to the background script to increment the click count
    // or at least it should, but each time I try it I get
    // an error in chrome developer IDE:
    // "Uncaught Error: Extension context invalidated."

    // commented out for now
    //chrome.runtime.sendMessage({ action: 'increment' });

});