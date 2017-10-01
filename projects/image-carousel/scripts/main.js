
$(document).ready(function() {
    slider()
});

 const images = {
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
//caching//
var cssURL;
function timer(){
    var inactive = true;
    for(var key in images){
        cssURL = "url("+images[key].url+")";
        $("#main-image").css("background-image", cssURL);
    }

}

function slider(active) {
    //caching
    active = false;
    var nav = $('.nav');
    //hacks//
    $(nav).on('click', function() {
        var attribute = $(this).attr("id");
        cssURL = "url("+images[attribute].url+")";
        $(this).addClass('active')
                    .siblings().removeClass('active');
        $("#main-image").css("background-image", cssURL)
                    
    })

}
