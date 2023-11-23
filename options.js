
function buildSaveArray()
{
    //...
    var saveArray = [];
    var element = document.querySelectorAll('.sellerRow');
    for(var i = 0; i < element.length; i++)
    {

      var obj = {};
      obj.seller = element[i].querySelector('.seller input').value;
      obj.type = element[i].querySelector('.type select').value;

      // store seller into Blacklist held
      // in chrome storage
      saveArray.push(obj);
    }

    // update Blacklist
    saveOptions(saveArray);

    // Left off here...
}

// Saves options to chrome.storage
function saveOptions(saveArray)
{
  chrome.storage.sync.set({
    sellersArray: saveArray
  }, function()
     {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function()
      {
        status.textContent = '';
      }, 750);
  });
}
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions()
{
  chrome.storage.sync.get({
    sellersArray: []
  }, function(items){
    buildOptDisplay(items.sellersArray);
  });
}

function buildOptDisplay(items)
{

  if(items.length == 0)
  {
    document.querySelector('.addSeller').click();
  }

  for(var i = 0; i < items.length; i++)
  {
    if(typeof items[i] === "object")
    {
      createRowWithOptions(items[i], i);
    }
  }
}

function createRowWithOptions(obj, int = 0)
{

  var sellRow = document.querySelector('.sellerRow').innerHTML;

  // remove first item
  if(typeof document.querySelector('.sellerRow').dataset.id === 'undefined')
  {
    document.querySelector('.sellerRow').remove();
  }
  var newRow = document.createElement('div');
  newRow.className = 'sellerRow';
  var timestamp = (Date.now() + int);
  newRow.dataset.id = timestamp;
  newRow.innerHTML = sellRow;
  document.querySelector('.sellersHolder').appendChild(newRow);

  var newElem = document.querySelector('.sellersHolder .sellerRow[data-id="'+timestamp+'"]');
  newElem.querySelector('.seller input').value = obj.seller;
  newElem.querySelector('.type select').value = obj.type;

  newElem.querySelector('.type select').addEventListener('change', function(e){

    // debug statement
    console.log(e);
    var element = e.target;
    var parent = element.parentNode.parentNode;
  }
  );

  newElem.querySelector('.remove').addEventListener('click', function(e){
    newElem.remove();
  });
}

// add event listener to button that adds seller
document.querySelector('.addSeller').addEventListener('click', function(){
  
  var obj = {};
  obj.seller = "example";
  obj.type = '0';

  createRowWithOptions(obj);
});
  
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', buildSaveArray);