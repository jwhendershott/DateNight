'use strict';

//set variables
var city = ''
var breweryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&sort=-name ";

//generates call and logs response for openbrewery
$.ajax({
    url: breweryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});