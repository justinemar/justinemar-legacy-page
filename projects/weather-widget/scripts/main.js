
$(document).ready(function() {
var $city = $("#city");
var $country = $("#country");
var $temperature = $("#temp");
var $report = $("#desc");
var $icon = $("#icon");
var $unit = $("#temunit");
var $humid = $("#humidity");
var $wind = $("#wind");

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 600000
};

    if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(
weather,errorGettingPosition,
options);
     $('body').css("visibility","visible");
    }else{
        alert("Your browser doesn't support navigation");
    }
    

function weather(pos) {
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    let api = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&" + "lon=" + long;
    $.getJSON(api, function(data) {
        $($city).html(data.name + ", ");
        $($country).html(data.sys.country);
        $($temperature).html(data.main.temp + "°")
        $($report).html(data.weather[0].description);
        $($icon).attr("src", data.weather[0].icon);
        $($humid).html("Humidity: "+data.main.humidity + "%");
        $($wind).html("Wind: "+Math.round(data.wind.speed) + " km/h" )
        $(".location").css("font-size","3em");
        $(".main-status").css("min-height","404px");
        $(".weather-status").css("margin-left","68px");
        convert(data.main.temp,$temperature)
    });
    

}


function convert(temp,$temperature){
    $($unit).on('click', function(){
        if($(this).html() === "C"){
        temp = Math.round((temp * 1.8) + 32);
        $($temperature).html(temp + "°");
        $($unit).html("F");
        }else{
            temp = Math.round((temp - 32) * 5 / 9);
        $($temperature).html(temp + "°");
        $($unit).html("C");
        }
})
}


function errorGettingPosition(err)
{
	if(err.code==1)
	{
		alert("User denied geolocation.");
	}
	else if(err.code==2)
	{
		alert("Position unavailable.");
	}
	else if(err.code==3)
	{
		alert("Timeout expired.");
	}
	else
	{
		alert("ERROR:"+ err.message);
	}
}
});


