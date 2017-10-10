


$(document).ready(function(){
    var introCircle = $(".circle");
    var introParallel = $(".parallelogram");
    var introSquare = $(".square");
    var playBtn = $("#play-game");
    introCircle.css("top","0px");
    introSquare.css("right","0px");
    
    
    $(playBtn).on('click', function(){
        $('.game-start-ui').fadeOut();
    })  
})