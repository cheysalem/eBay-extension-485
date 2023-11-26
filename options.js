
function buildSaveArray()
{
    // array to store sellers
    // entered by user
    var saveArray = [];

    var element = document.querySelectorAll('.sellerRow');

    // for loop to iterate through
    // every seller the user has entered
    // into the Blacklist
    for(var i = 0; i < element.length; i++)
    {

      // instantiate object for 
      // seller information
      // and assign it to the input
      var obj = {};
      obj.seller = element[i].querySelector('.seller input').value;
      obj.type = element[i].querySelector('.type select').value;

      // store seller into array holding
      // all instantiated seller objects
      // from user input
      saveArray.push(obj);
    }

    // update Blacklist
    saveOptions(saveArray);

}

// saves options to chrome.storage
function saveOptions(saveArray)
{
  chrome.storage.sync.set({
    sellersArray: saveArray
  }, function()
     {
      // update status to let user know options were saved
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function()
      {
        status.textContent = '';
      }, 750);
  });
}
  
// restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions()
{
  chrome.storage.sync.get({
    sellersArray: []
  }, function(items){
    buildOptDisplay(items.sellersArray);
  });
}

// function to build the display of
// sellers currently stored in the
// Blacklist
function buildOptDisplay(items)
{

  // check if Black list is
  // empty
  if(items.length == 0)
  {
    document.querySelector('.addSeller').click();
  }

  // for loop to iterate through all seller
  // objects given by parameter
  for(var i = 0; i < items.length; i++)
  {
    if(typeof items[i] === "object")
    {
      createRowWithOptions(items[i], i);
    }
  }
}

// function to display one of the seller
// objects stored in the Blacklist
function createRowWithOptions(obj, int = 0)
{

  var sellRow = document.querySelector('.sellerRow').innerHTML;

  // remove first item that shows appears when user
  // returns to options page
  if(typeof document.querySelector('.sellerRow').dataset.id === 'undefined')
  {
    document.querySelector('.sellerRow').remove();
  }


  // instantiate new seller object
  // to be atted to list
  var newRow = document.createElement('div');

  // assign new seller object's
  // attributes
  newRow.className = 'sellerRow';
  var timestamp = (Date.now() + int);
  newRow.dataset.id = timestamp;
  newRow.innerHTML = sellRow;

  // add seller object to class holding all sellers currently in list
  document.querySelector('.sellersHolder').appendChild(newRow);

  // assign input information to added seller
  var newElem = document.querySelector('.sellersHolder .sellerRow[data-id="'+timestamp+'"]');
  newElem.querySelector('.seller input').value = obj.seller;
  newElem.querySelector('.type select').value = obj.type;

  // add an event listener that detects when the button
  // to remove a specific seller is presesed
  newElem.querySelector('.remove').addEventListener('click', function(e){
    newElem.remove();
  });
}

// add event listener to detect when the button to add a seller
// is clicked
document.querySelector('.addSeller').addEventListener('click', function(){
  
  var obj = {};
  obj.seller = "example";
  obj.type = '0';

  // pass object to our function used
  // to create new seller entries
  createRowWithOptions(obj);
});
  
// add event listener that updates the options information when
// extension tab is loaded
document.addEventListener('DOMContentLoaded', restoreOptions);

// add event listener that detects when the user presees the button to 
// save the options entered
document.getElementById('save').addEventListener('click', buildSaveArray);