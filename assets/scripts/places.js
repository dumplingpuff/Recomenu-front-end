'use strict';

let input = document.getElementById('restaurant-entry');

let options = {
  types: ['establishment']
};

let autocomplete = new google.maps.places.Autocomplete(input);

function fillInAddress() {
  let place = autocomplete.getPlace();
  document.getElementById('location-entry').value = place.formatted_address;
}

$(document).ready(function() {
  $('.get-place').on('click', function() {
    console.log(autocomplete.getPlace());
  });
  autocomplete.addListener('place_changed', fillInAddress);
});
