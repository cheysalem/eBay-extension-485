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

