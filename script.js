console.log("---Screen Content Script---")
chrome.storage.sync.get({
    sellersArray: []
}, function(items){
    replacePageWords(items.sellersArray);
});

function replacePageWords(sellersArray)
{

    for(var i = 0; i < sellersArray.length; i++)
    {
        replaceWord(sellersArray[i]);
    }
}

function replaceWord(obj)
{

    var allElems = document.querySelectorAll('h1, h2, h3, h4, h5, p, a, caption, span, td, div, article');

    for(var i = 0; i < allElems.length; i++)
    {
        if(allElems[i].innerText.toLowerCase().includes(obj.seller.toLowerCase()))
        {
            if(obj.type == '0')
            {
                // remove (main one needed)
                //allElems[i].style.display = 'none';
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

function addStyleSheet(css) {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
}
//add a style sheet that removes sponsored content
addStyleSheet(`
.x-ads-placements,.x-merch-nori{
    display: none !important;
}`
);

console.log('script');

