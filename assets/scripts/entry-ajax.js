'use strict';

const Index = require('./index.js');

module.exports = true;

const holder = {
  baseUrl: "http://localhost:3000"
};


let logResponseBody = function(responseBody) {
  console.table(responseBody);
};

let logRequestError = function(requestObject) {
  console.error(requestObject);
};


let displayEntries = function(response){
  let entries = response.entries;
  let entryListingTemplate = require('./entry-listing.handlebars');
    $('.my-entries').append(entryListingTemplate({entries}));
};

let getEntries = function(){
  $.ajax({
    url: holder.baseUrl + '/entries',
    method: 'GET',
    dataType: 'json'
  }).done(function(entries){
    displayEntries(entries);
  }).fail(function(jqxhr) {
    logRequestError(jqxhr);
  });
};


let postEntries = function(event) {
  $.ajax({
    url: holder.baseUrl + '/entries',
    method: 'POST',
    contentType: false,
    processData: false,
    data: event
  })
  .done(function(data) {
    console.log('Running post entries');
    logResponseBody(data);
  }).fail(function(jqxhr) {
    logRequestError(jqxhr);
  });
};

let init = function() {
  $('.post-entry').on('submit', function(e) {
    e.preventDefault();
    let entry = new FormData(event.target);
    postEntries(entry);
  });
};

// let deleteEntries = function() {
//     $.ajax({
//     url: holder.baseUrl + '/entries/' + this.id,
//     method: 'DELETE',
//     headers: {
//       Authorization: 'Token token=' + holder.user.token,
//     },
//     contentType: false,
//     processData: false,
//   }).done(function(data) {
//     logResponseBody(data);
//   })
//   .fail(function(jqxhr) {
//     logRequestError(jqxhr);
//   });
// };

$(document).ready(function() {
  console.log("you're in.");
  getEntries();
  init();
  $('.test-p').on('click', function(){
    let hi =  "[data-van =" + $(this).attr('data-car') + "]";

    console.log(hi);
    $(hi).modal('show');
  });


});
