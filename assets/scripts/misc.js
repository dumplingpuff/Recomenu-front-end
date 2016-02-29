// 'use strict'
// let signUpUser = function(e) {
//   e.preventDefault();
//   var formData = new FormData(e.target);
//   $.ajax({
//     url: holder.baseUrl + '/sign-up',
//     method: 'POST',
//     contentType: false,
//     processData: false,
//     data: formData,
//   }).done(function(data) {
//     console.log(data);
//   }).fail(function(jqxhr) {
//     console.error(jqxhr);
//   });
// };
//
// let changePassword = function(e) {
//   e.preventDefault();
//   if (!holder.user) {
//     console.error('Wrong!');
//     return;
//   }
//   var formData = new FormData(e.target);
//   $.ajax({
//     url: holder.baseUrl + '/change-password',
//     method: 'PATCH',
//     headers: {
//       Authorization: 'Token token=' + holder.user.token,
//     },
//     contentType: false,
//     processData: false,
//     data: formData,
//   }).done(function(data) {
//     console.log(data);
//   }).fail(function(jqxhr) {
//     console.error(jqxhr);
//   });
// };
