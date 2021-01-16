'use strict';


//set variables
var city = document.getElementById("city-field");
const tmKey = "8IbZBo40AnRzs987iA70DEBWvamJn6Ub"

// .on("click") function associated with Find Drinks button
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    city = document.getElementById("city-field").value;
    //logs updated city value to console
    console.log(city);

    //generates call and logs response for openbrewery
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_city=" + city + "&sort=-name ",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response[0].name);
        console.log(response[0].phone);
        console.log(response[0].wbesite_url);
        
        $("#name").html("Name: " + response[0].name);
        $("#phone").html("Phone Number: " + response[0].phone);
        $("#street").html("Street: " + response[0].street);

    });
    
})

// .on("click") function associated with Find Event button
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    city = document.getElementById("city-field").value;
    //logs updated city value to console
    console.log(city);

    //generates call and logs response for ticketmaster
    $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=" + tmKey + "&city=" + city,
        async:true,
        dataType: "json",
        success: function(response) {
                    console.log(response);
                    // Parse the response.
                    console.log(response._embedded.events[0].name);
                    console.log(response._embedded.events[0].url);

                    $("#event-name").html("Event Name: " + response._embedded.events[0].name);
                    $("#event-url").html("More Information: " + response._embedded.events[0].url);
                    

                },
        error: function(err) {
                    console.log(err)
                }
    }) 
    
});

$("#searchResults").hide();

$("#searchButton").click(function(){
    $("#searchResults").show();
})