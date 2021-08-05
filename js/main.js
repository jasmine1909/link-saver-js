// Listen for form submit
document.addEventListener("DOMContentLoaded",fetchLinkSavers());
document.getElementById('myForm').addEventListener('submit', saveLink);

// Save Bookmark
function saveLink(e){
  // Get form values
  var siteName =document.getElementById('siteName').value;
  var siteUrl =document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var link = {
    name: siteName,
    url: siteUrl
  }

  /*
    // Local Storage Test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
  */

  // Test if bookmarks is null
  if(localStorage.getItem('links') === null){
    // Init array
    var links = [];
    // Add to array
    links.push(link);
    // Set to localStorage
    localStorage.setItem('links', JSON.stringify(links));
  } else {
    // Get bookmarks from localStorage
    var links = JSON.parse(localStorage.getItem('links'));
    // Add bookmark to array
    links.push(link);
    // Re-set back to localStorage
    localStorage.setItem('links', JSON.stringify(links));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchLinkSavers();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmark
function deleteLinkSavers(url){
  // Get bookmarks from localStorage
  var links = JSON.parse(localStorage.getItem('links'));
  // Loop through the bookmarks
  for(var i =0;i < links.length;i++){
    if(links[i].url == url){
      // Remove from array
      links.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('links', JSON.stringify(links));

  // Re-fetch bookmarks
  fetchLinkSavers();
}

// Fetch bookmarks
function fetchLinkSavers(){
  // Get bookmarks from localStorage
  var links = JSON.parse(localStorage.getItem('links'));
  // Get output id
  var linksResults = document.getElementById('linksResults');

  // Build output
  linksResults.innerHTML = '';
  for(var i = 0; i < links.length; i++){
    var name = links[i].name;
    var url = links[i].url;

    linksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                  ' <a onclick="deleteLinkSavers(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}

// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}
