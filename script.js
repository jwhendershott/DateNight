"use strict";

//Set variable for Zomato Key
const zomatoKey = "001bff94b90bf77eb48c79d0e762419c"

//Create AJAX call
// var queryURL = "https://developers.zomato.com/api/v2.1/cities?user-key=" + zomatoKey + "&q=Denver"
$.ajax({
    url: "https://developers.zomato.com/api/v2.1/restaurant?res_id=RESID",
    dataType: 'json',
    async: true,
    beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
    zomatoKey);},  // This inserts the api key into the HTTP header
    success: function(response) { console.log(response) } });

