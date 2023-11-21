
function buildSaveArray()
{
    //...
    var saveArray = [];
    saveOptions(saveArray);

    // Left off here...
}

// Saves options to chrome.storage
const saveOptions = (saveArray) =>
{
    
    chrome.storage.sync.set({
        bSellerArray : saveArray
    },() => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
};
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get({
        bSellerArray : []
    }, (items) => {

        buildListDisplay(items.bSellerArray);

    });
};

  function buildListDisplay(items)
  {

    if(items.length == 0)
    {
        document.querySelector('.addSeller').click();
    }

    for(var i = 0; i < items.length; i++)
    {
        //items[i]
        if(typeof i === "object")
        {
            createRowWithOptions(items[i]);
        }
    }
  }

  function createRowWithOptions(obj)
  {

    var blockedSellerRow = document.querySelector('.bSellerRow').innerHTML;

    // Error was occurring where more lines could not be added. Commented
    // out for now since only purpose is mostly aesthetic
    // (makes it so first input prompt does not appear until selecting
    // "Add seller to the Blacklist")
    //if(typeof document.querySelector('.bSellerRow').dataset.id === 'undefined')
    //{
    //    document.querySelector('.bSellerRow').remove();
    //}

    // person in the video commented this out, will do so too
    // document.querySelector('.bSellerHolder').innerHTML += blockerSellerRow;
    var newBlockedSellerRow = document.createElement('div');
    newBlockedSellerRow.className = 'bSellerRow';
    var timestamp = Date.now();
    newBlockedSellerRow.id = timestamp;
    newBlockedSellerRow.innerHTML = blockedSellerRow;
    document.querySelector('.bSellerHolder').appendChild(newBlockedSellerRow)

    var newElem = document.querySelector('.bSellerHolder .bSellerRow[data-id="'+timestamp+'"]');

    // Line giving errors, commented out for now
    //newElem.querySelector('inputSeller keyword').value = obj.keyword;

  }

  // add event listener to button that adds seller
  document.querySelector('.addSeller').addEventListener('click', function(){

    var obj = {};
    obj.keyword = "example";

    createRowWithOptions(obj);

  });
  
  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', buildSaveArray);