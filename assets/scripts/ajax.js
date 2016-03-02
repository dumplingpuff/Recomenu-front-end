'use strict';

let index = require('./index');

let constant = require('./constant');



let logResponseBody = function(responseBody) {
  console.log(responseBody);
};

let logRequestError = function(requestObject) {
  console.error(requestObject);
};

let hideModal = function() {
  $('.modal').modal('hide');
};

//
// let toggleAdmin = function() {
//   if(constant.holder.user['admin']) {
//     $('.admin').show();
//
//   }
//   else {
//     $('.admin').hide();
//     // $('.suggest-bttn').addClass('hide');
//   }
// };

let toggleLogIn = function() {
  if(constant.holder.user) {
    $('.sign-btns').hide();
    $('.sign-out-bttn').show();
  }
  else {
    $('.sign-btns').show();
    $('.sign-out-bttn').hide();
  }
};


let signUpUser = function(e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: constant.holder.baseUrl + '/sign-up',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    logResponseBody(data);
    hideModal();
    $('#sign-up input').val('');
    // $('.admin').removeClass('hide');
  }).fail(function(jqxhr) {
    logRequestError(jqxhr);
  });
};


let signInUser = function(e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: constant.holder.baseUrl + '/sign-in',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    constant.holder.user = data.user;
    // console.log(constant.holder.user['admin']);
    toggleLogIn();
    // toggleAdmin();
    logResponseBody(data);
    hideModal();
    $('.modal').val('');
    console.log(constant.holder);
  }).fail(function(jqxhr) {
    $('.modal').val('');
    logRequestError(jqxhr);
  });
};

let signOutUser = function(e) {
    e.preventDefault();
    $.ajax({
      url: constant.holder.baseUrl + '/sign-out/' + constant.holder.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + constant.holder.user.token,
      },
      contentType: false,
      processData: false,
    }).done(function(data) {
      logResponseBody(data);
      constant.holder.user= '';
      toggleLogIn();
      // toggleAdmin();
    }).fail(function(jqxhr) {
      logRequestError(jqxhr);
    });
};



let getSuggestId = function(e) {

};

let vote = function(e) {};




let displayEntries = function(response){
  let entries = response.entries;
  let entryListingTemplate = require('./entry-listing.handlebars');
  // $('.my-entries').html('');
    $('.my-entries').html(entryListingTemplate({entries}));
};


let getEntries = function(){
  $.ajax({
    url: constant.holder.baseUrl + '/entries',
    method: 'GET',
    dataType: 'json'
  }).done(function(entries){
    displayEntries(entries);
  }).fail(function(jqxhr) {
    logRequestError(jqxhr);
  });
};


let displaySuggestions = function(response){
  let suggestions = response.suggestions;
  // debugger;
  // $('.suggestions').html('');
  let suggestionListingTemplate = require('./suggestion-listing.handlebars');

    $('.suggestions').html(suggestionListingTemplate({suggestions}));
    getEntries();
};



let getSuggestions = function() {
  $.ajax({
    url: constant.holder.baseUrl + '/suggestions',
    method: 'GET',
    dataType: 'json'
  }).done(function(suggestions){
    displaySuggestions(suggestions);
  }).fail(function(jqxhr) {
    logRequestError(jqxhr);
  });
};


let postSuggestion = function(e) {
  e.preventDefault();
  let suggestion = new FormData(e.target);
  $.ajax({
    url: constant.holder.baseUrl + '/suggestions',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + constant.holder.user.token,
    },
    processData: false,
    contentType: false,
    data: suggestion
  })
  .done(function(data) {
    logResponseBody(data);
    hideModal();
    $('#suggestion-modal input').val('');
    getSuggestions();
  }).fail(function(jqxhr) {
    logRequestError(jqxhr);
  });
};



let postEntries = function(e) {
  e.preventDefault();
  let entry = new FormData(e.target);
  $.ajax({
    url: constant.holder.baseUrl + '/entries',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + constant.holder.user.token,
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



let getId = function(e) {
  let id = $(e.target).attr('data-edit-id');
  $('.edit-entry-submit').attr('data-edit-id', id);
  let a = $('.edit-entry-submit').attr('data-edit-id');
  console.log(a);
};

let editEntries = function(e){
  e.preventDefault();
  let entry = new FormData(e.target);
  $.ajax({
    url: constant.holder.baseUrl + '/entries/' + $('.edit-entry-submit').attr('data-edit-id'),
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + constant.holder.user.token,
    },
    contentType: false,
    processData: false,
    data: entry
  }
  ).done(function(data) {
    logResponseBody(data);
    hideModal();
    $('#post-entry input').val('');
    getEntries();
  }).fail(function(jqxhr) {
    logRequestError(jqxhr);
    console.log($('.edit-entry-submit').attr('data-edit-id'));
  });
};

let deleteEntries = function(e) {
    $.ajax({
    url: constant.holder.baseUrl + '/entries/' + $(e.target).attr("data-id"),
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + constant.holder.user.token,
    },
    contentType: false,
    processData: false,
  }).done(function(data) {
    console.log('deleted');
    logResponseBody(data);
    getEntries();
  })
  .fail(function(jqxhr) {
    logRequestError(jqxhr);
  });
};







$(document).ready(function(){
  getSuggestions();

  toggleLogIn();
  $('.test').hide();
  $('#sign-up').on('submit', function(e){
    e.preventDefault();
    signUpUser(e);
  });
  $('#sign-in').on('submit', function(e) {
    e.preventDefault();
    signInUser(e);
  });
  $('#sign-out').on('click', signOutUser);
  $('#post-entry').on('submit', function(e) {
    e.preventDefault();
    postEntries(e);
  });
  $('.my-entries').on('click','.delete-entry', function(e) {
    deleteEntries(e);
    $(e.target).remove();
  });
  $('.my-entries').on('click', '.edit-entry', getId);
  $('#edit-entry').on('submit', function(e) {
    e.preventDefault();
    editEntries(e);
  });
  $('#post-suggest').on('submit', function(e) {
    e.preventDefault();
    postSuggestion(e);
  });
  // toggleAdmin();
});




// $('#post-entry').on('submit', function(e) {
//     console.log('taking that dive.');
//     e.preventDefault();
//     let entry = new FormData(e.target);
//     $.ajax({
//       url: constant.holder.baseUrl + '/entries',
//       method: 'POST',
//       headers: {
//         Authorization: 'Token token=' + constant.holder.user.token,
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
//     url: constant.holder.baseUrl + '/entries',
//     method: 'POST',
//     headers: {
//       Authorization: 'Token token=' + constant.holder.user.token,
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






module.exports = true;
