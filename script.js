console.log("---Screen Content Script---")
chrome.storage.sync.get({
    keywordsArray: []
}, function(items){
    replacePageWords(items.keywordsArray);
});

function replacePageWords(keywordsArray)
{

    for(var i = 0; i < keywordsArray.length; i++)
    {
        replaceWord(keywordsArray[i]);
    }
}

function replaceWord(obj)
{

    var allElems = document.querySelectorAll('h1, h2, h3, h4, h5, p, a, caption, span, td, div, article');

    for(var i = 0; i < allElems.length; i++)
    {
        if(allElems[i].innerText.toLowerCase().includes(obj.keyword.toLowerCase()))
        {
            if(obj.type == '0')
            {
                // remove (main one needed)
                allElems[i].innerHTML = allElems[i].innerHTML.replace(obj.keyword, '');
            }
            else if(obj.type == '1')
            {
                // replace
                allElems[i].innerHTML = allElems[i].innerHTML.replace(obj.keyword, obj.replace);
            }
            else if((obj.type == '2'))
            {
                // blur
                allElems[i].style.color = 'transparent';
                allElems[i].style.textShadow = '0 0 8px rgba(0,0,0,0.5)';
            }
        }
    }

}

