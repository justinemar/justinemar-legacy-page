/*      JUSTIN CANTADO 
WRITTEN FROM 9/29/17 TO 10/1/17 

WITH THIS CONCEPT WE DON'T HAVE TO CREATE SEPERATE IMAGE CONTAINER FROM THE HTML FILE*/
const images = { //LIST OF IMAGES//
    image1: {
        url: "https://105ron.github.io/image-slider/images/bubble.jpeg"
    },
    image2: {
        url: "https://105ron.github.io/image-slider/images/plumage.jpeg"
    },
    image3: {
        url: "https://105ron.github.io/image-slider/images/chestnut.jpeg"
    },
    image4: {
        url: "https://105ron.github.io/image-slider/images/lily.jpeg"
    }

}


$(document).ready(function() {
    slider()
});


var suffix = 0;
var interval = setInterval(animate, 5000); //change image every 30s
function animate() {
    if (suffix !== 4) {
        suffix += 1;
        let timerURL = "url(" + images["image" + suffix].url + ")";
        let currentID = "#image" + suffix;
        $("#main-image").css("background-image", timerURL);
        $(currentID).addClass("active")
            .siblings().removeClass("active");
    }
    else {
        suffix = 0;
    }
}
animate();

//caching//
var cssURL;

//SLIDER//
function slider() {
    //caching
    var nav = $('.nav');
    //hacks//
    $(nav).on('click', function() {
        var attribute = $(this).attr("id"); //GET THE ID OF THE NAV//
        cssURL = "url(" + images[attribute].url + ")"; //SET THE REFERRED THE ID AS A PROPERTY FROM IMAGES OBJECT//
        $(this).addClass('active') //ADD CLASS TO THE NAV//
            .siblings().removeClass('active'); //REMOVE EXISTING CLASS FROM IT'S SIBLINGS//
        $("#main-image").css("background-image", cssURL) //SET BACKGROUND IMAGE TO CURRENT REFFERED IMAGE//
        suffix = attribute.slice(-1);
        suffix = Number(suffix);
    })

}
