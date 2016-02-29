'use strict';

const holder = {
  baseUrl: "http://localhost:3000"
};

let logResponseBody = function(responseBody) {
  console.table(responseBody);
};

let logRequestError = function(requestObject) {
  console.error(requestObject);
};

let hideModal = function() {
  $('.modal').modal('hide');
};

let signInUser = function(e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: holder.baseUrl + '/sign-in',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    holder.user = data.user;
    logResponseBody(data);
    hideModal();
    $('#sign-in input').val('');
  }).fail(function(jqxhr) {
    logRequestError(jqxhr);
  });
};

let signOutUser = function(e) {
    e.preventDefault();
    $.ajax({
      url: holder.baseUrl + '/sign-out/' + holder.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + holder.user.token,
      },
      contentType: false,
      processData: false,
    }).done(function(data) {
      logResponseBody(data);
    }).fail(function(jqxhr) {
      logRequestError(jqxhr);
    });
};



let postEntries = function(e) {
  e.preventDefault();
  let entry = new FormData(e.target);
  $.ajax({
    url: holder.baseUrl + '/entries',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + holder.user.token,
    },
    processData: false,
    contentType: false,
    data: entry
  })
  .done(function(data) {
    logResponseBody(data);
    hideModal();
    $('#post-entry input').val('');
    getEntries();
  }).fail(function(jqxhr) {
    logRequestError(jqxhr);
  });
};

let displayEntries = function(response){
  let entries = response.entries;
  let entryListingTemplate = require('./entry-listing.handlebars');
    $('.my-entries').html(entryListingTemplate({entries}));
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


$(document).ready(function(){
  getEntries();
  $('#sign-in').on('submit', signInUser);
  $('#post-entry').on('submit',postEntries);
});




// $('#post-entry').on('submit', function(e) {
//     console.log('taking that dive.');
//     e.preventDefault();
//     let entry = new FormData(e.target);
//     $.ajax({
//       url: holder.baseUrl + '/entries',
//       method: 'POST',
//       headers: {
//         Authorization: 'Token token=' + holder.user.token,
//       },
//       processData: false,
//       contentType: false,
//       data: entry
//     })
//     .done(function(data) {
//       console.log('Running post entries');
//       logResponseBody(data);
//     }).fail(function(jqxhr) {
//       logRequestError(jqxhr);
//     });
// });

// let postEntries = function(e) {
//   e.preventDefault();
//   let entry = new FormData(e.target);
//   $.ajax({
//     url: holder.baseUrl + '/entries',
//     method: 'POST',
//     headers: {
//       Authorization: 'Token token=' + holder.user.token,
//     },
//     contentType: false,
//     processData: false,
//     data: entry
//   })
//   .done(function(data) {
//     console.log('Running post entries');
//     // logResponseBody(data);
//     console.log(data);
//   }).fail(function(jqxhr) {
//     console.log(jqxhr);
//     // logRequestError(jqxhr);
//   });
// };


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



module.exports = true;
