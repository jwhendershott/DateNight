'use strict';

//set variables
var city = document.getElementById("city-field");
const breweryURL = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&sort=-name ";
const tmKey = "8IbZBo40AnRzs987iA70DEBWvamJn6Ub"

//generates call and logs response for openbrewery
$.ajax({
    url: breweryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
});

//Ticketmast call
$.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=" + tmKey + "&city=" + city,
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                // Parse the response.
                // Do other things.
             },
    error: function(err) {
                // This time, we do not end up here!
                console.log(err)
             }
  });

// .on("click") function associated with Find Drinks button
$("#find-drinks").on("click", function(event) {
    event.preventDefault();
    city = document.getElementById("city-field").value;

    //logs updated city value to console
    console.log(city);
});