'use strict';


//set variables
var city = document.getElementById("city-field");
const tmKey = "8IbZBo40AnRzs987iA70DEBWvamJn6Ub";

var cityNameStorage = localStorage.getItem("City Name");
$("#city-field").val(cityNameStorage);

// .on("click") function associated with search button
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    city = document.getElementById("city-field").value;
    localStorage.setItem("City Name", city);

    //generates call for openbrewery
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_city=" + city + "&sort=-name ",
        method: "GET"
    }).then(function(response) {
        // Makes the brewery listed random
        var breweryChoice = Math.floor(Math.random() * 20);
        
        $("#name").html("Name: " + response[breweryChoice].name);
        $("#phone").html("Phone Number: " + response[breweryChoice].phone);
        $("#street").html("Street: " + response[breweryChoice].street);

        // Creates variables for mapboxAPI and calls function
        var streetAddress = response[breweryChoice].street + "%20";
        var cityAddress = response[breweryChoice].city+ "%20";
        var stateAddress = response[breweryChoice].state + "%20";
        var zipCode = response[breweryChoice].postal_code + "%20";
        
        // Conditional statement to account for lack of brewery API information
        if (response[breweryChoice].street == "") {
            $("#street").text("Street: Address information not available");
            $("#mapbox").hide();
        } else {
            $("#mapbox").show();
            mapboxAPI(streetAddress, cityAddress, stateAddress, zipCode);
        };

    });
    
})

// .on("click") function associated with the search button
$("#searchButton").on("click", function(event) {
    event.preventDefault();
    city = document.getElementById("city-field").value;

    //generates call for ticketmaster
    $.ajax({
        type:"GET",
        url:"https://app.ticketmaster.com/discovery/v2/events.json?size=5&apikey=" + tmKey + "&city=" + city,
        async:true,
        dataType: "json",
        success: function(response) {
                    console.log(response);
                    // Makes the event listed random
                    var eventChoice = Math.floor(Math.random() * 5);

                    $("#event-name").html("Event Name: " + response._embedded.events[eventChoice].name);
                    $("#event-url").attr("href", response._embedded.events[eventChoice].url);
                    $("#event-url").attr("target", "_blank");

                },
        error: function(err) {
                    console.log(err)
                }
    }) 
    
});

// Function associated with Mapbox API
function mapboxAPI(streetAddress, cityAddress, stateAddress, zipCode) {

    // Generates and logs response from Mapbox
    $.ajax({
        url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + streetAddress + cityAddress + stateAddress + zipCode + ".json?access_token=pk.eyJ1IjoicmNoYXBoZWthciIsImEiOiJja2swcHU5eGowZzlrMm9vdGZjYW41cmQyIn0.6LlorWQZFVTlXJcLezW6pw",
        method: "GET"
    }).then(function(response) {
        var lng = response.features[0].center[0];
        var lat = response.features[0].center[1];
        
        mapboxgl.accessToken = 'pk.eyJ1IjoicmNoYXBoZWthciIsImEiOiJja2swcHU5eGowZzlrMm9vdGZjYW41cmQyIn0.6LlorWQZFVTlXJcLezW6pw';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 17
        });
        new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);
        });    
};


$("#searchResults").hide();

$("#searchButton").click(function(){
    var searchBar = $("#city-field").val();
    var alertModal = $("#alertModal");
    
    if (searchBar == "") {
        alertModal.addClass("is-active");
        $(".modal-close").click(function(){
            alertModal.removeClass("is-active");
        });
        $(".modal-background").click(function(){
            alertModal.removeClass("is-active");
        });
    }
    else {
        $("#searchResults").show();
    }
})

$("#mapbox").click(function(){
    var mapModal = $("#mapModal");
    
    mapModal.addClass("is-active");
    $(".modal-close").click(function(){
        mapModal.removeClass("is-active");
    });
    $(".modal-background").click(function(){
        mapModal.removeClass("is-active");
    });
})