// 'use strict';
//
// let constant = require('./index.js');
//
// module.exports = true;
//
//
// let logResponseBody = function(responseBody) {
//   console.table(responseBody);
// };
//
// let logRequestError = function(requestObject) {
//   console.error(requestObject);
// };
//
//
// let getEntries = function(){
//   $.ajax({
//     url: constant.holder.baseUrl + '/entries',
//     method: 'GET',
//     dataType: 'json'
//   }).done(function(entries){
//     displayEntries(entries);
//   }).fail(function(jqxhr) {
//     logRequestError(jqxhr);
//   });
// };
//
//
// let postEntries = function(e) {
//   e.preventDefault();
//   let entry = new FormData(e.target);
//   $.ajax({
//     url: constant.holder.baseUrl + '/entries',
//     method: 'POST',
//     headers: {
//       Authorization: 'Token token=' + constant.holder.user.token,
//     },
//     processData: false,
//     contentType: false,
//     data: entry
//   })
//   .done(function(data) {
//     logResponseBody(data);
//     hideModal();
//     $('#post-entry input').val('');
//     getEntries();
//   }).fail(function(jqxhr) {
//     logRequestError(jqxhr);
//   });
// };
//
// let displayEntries = function(response){
//   let entries = response.entries;
//   let entryListingTemplate = require('./entry-listing.handlebars');
//     $('.my-entries').html(entryListingTemplate({entries}));
// };
//
//
// let deleteEntries = function(e) {
//     $.ajax({
//     url: constant.holder.baseUrl + '/entries/' + $(e.target).attr("data-id"),
//     method: 'DELETE',
//     headers: {
//       Authorization: 'Token token=' + constant.holder.user.token,
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
//
// $(document).ready(function() {
//   console.log("you're in.");
//   getEntries();
//   init();
//   $('.test-p').on('click', function(){
//     let hi =  "[data-van =" + $(this).attr('data-car') + "]";
//
//     console.log(hi);
//     $(hi).modal('show');
//   });
// });
