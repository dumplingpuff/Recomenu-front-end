'use strict';

let input = document.getElementById('find-place');

let options = {
  types: ['establishment']
};

let autocomplete = new google.maps.places.Autocomplete(input);

function fillInPlace() {
  let place = autocomplete.getPlace();
  console.log(place);
  document.getElementById('restaurant-entry').value = place.name;
  document.getElementById('location-entry').value = place.formatted_address;
}

$(document).ready(function() {
  autocomplete.addListener('place_changed', fillInPlace);
});
