'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

let constant =require('./constant');

let ajax = require('./ajax');

let toggleAdmin = function() {
  if(constant.holder.user.admin) {
    $('.admin').show();
  }
  else {
    $('.admin').hide();
  }
};

let toggleLogIn = function() {
  if(constant.holder.user.token) {
    $('.sign-buttons').show();
  }
  else {
    $('.sign-buttons').hide();
  }
};

module.exports = {
  toggleAdmin,
  toggleLogIn
};

//
// $(document).ready(function() {
//   // entryAjax.getEntries();
//   // $('#sign-in').on('submit', logInAjax.signInUser);
//   // $('#sign-out').on('click', logInAjax.signOutUser);
//
// });
