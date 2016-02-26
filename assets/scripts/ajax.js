'use strict';

module.exports = true;



let getEntries = function(){
  $.ajax({
    url: "http://localhost:3000.com/entries",
    method: 'GET',
    dataType: 'json'
  }).done(function(entries){
    displayEntries(entries);
  });
};

let displayEntries = function(entries){
  let entryListingTemplate = require('./entry-listing.handlebars');
    $('.my-entries').append(entryListingTemplate({entries}));
};



$(document).ready(function() {
  getEntries();
});
