
function buildSaveArray()
{
    //...
    var saveArray = [];
    var element = document.querySelectorAll('.keyword-row');
    for(var i = 0; i < element.length; i++)
    {

      var obj = {};
      obj.keyword = element[i].querySelector('.keyword input').value;
      obj.type = element[i].querySelector('.type select').value;
      obj.replace = element[i].querySelector('.replace input').value;

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
    keywordsArray: saveArray
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
    keywordsArray: []
  }, function(items){
    buildOptDisplay(items.keywordsArray);
  });
}

function buildOptDisplay(items)
{

  if(items.length == 0)
  {
    document.querySelector('.add-keyword').click();
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
  // debug statement
  console.log('build row', obj);

  var keywordRow = document.querySelector('.keyword-row').innerHTML;

  // remove first item
  if(typeof document.querySelector('.keyword-row').dataset.id === 'undefined')
  {
    document.querySelector('.keyword-row').remove();
  }
  var newRow = document.createElement('div');
  newRow.className = 'keyword-row';
  var timestamp = (Date.now() + int);
  newRow.dataset.id = timestamp;
  newRow.innerHTML = keywordRow;
  document.querySelector('.keywords-holder').appendChild(newRow);

  var newElem = document.querySelector('.keywords-holder .keyword-row[data-id="'+timestamp+'"]');
  newElem.querySelector('.keyword input').value = obj.keyword;
  newElem.querySelector('.type select').value = obj.type;
  if(obj.type=='1')
  {
    newElem.querySelector('.replace').style.display = 'block';
    newElem.querySelector('.replace input').value = obj.replace;
  }
  else
  {
    newElem.querySelector('.replace').style.display = 'none';
  }

  newElem.querySelector('.type select').addEventListener('change', function(e){

    // debug statement
    console.log(e);
    var element = e.target;
    var parent = element.parentNode.parentNode;

    if(element.value=='1')
    {
      parent.querySelector('.replace').style.display = 'block';
    }
    else
    {
      parent.querySelector('.replace').style.display = 'none';
    }
  }
  );

  newElem.querySelector('.remove').addEventListener('click', function(e){
    newElem.remove();
  });
}

// add event listener to button that adds seller
document.querySelector('.add-keyword').addEventListener('click', function(){
  
  var obj = {};
  obj.keyword = "example";
  obj.type = '1';
  obj.replace = 'string';

  createRowWithOptions(obj);
});
  
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', buildSaveArray);