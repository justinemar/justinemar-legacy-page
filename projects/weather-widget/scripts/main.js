
$(document).ready(function() {
var $city = $("#city");
var $country = $("#country");
var $temperature = $("#temp");
var $report = $("#desc");
var $icon = $("#icon");
var $unit = $("#temunit");
var $humid = $("#humidity");
var $wind = $("#wind");



    if (navigator.geolocation) {
        var lat;
        var long;
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            weather(lat, long); //Call function if navigator is available//
            $('body').css("visibility","visible");
        });
    }else{
        alert("Your browser doesn't support navigation");
    }
    

function weather(lat, long) {
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
});


