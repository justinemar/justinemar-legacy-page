
var effect_scroll = {
    specificPos: function(pos,elem,_class){
       $(window).on('scroll', function(){
        if($(window).scrollTop() > pos)
            $(elem).addClass(_class);
        else
            $($(elem)).removeClass(_class);
       }); 
    },
    bottom: function(elem,speed){
       $(window).on('scroll', function(){
        if($(window).scrollTop() + $(window).height() === $(document).height()){
            $(elem).show(speed);
        }else{
            $(elem).hide(speed);
        }
        });
    }
}




$(document).ready(function(){
    $(this).scrollTop(0); // Force page to get on top when reload

    /* call function */
    effect_scroll.specificPos(300,".parallax-1","blur");
    effect_scroll.specificPos(235,".fake-header","nav-fixed")
    effect_scroll.bottom(".go-top", "fast")
    // Just a little fun
   var updateFollower = setInterval(function(){
         $(".count").first().text("1.2M");
    }, 500)
      // href smooth 
     $("a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
      });
    } // End if
  });
  
  
//Smooth Scroll
if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

function wheel(event) {
    var delta = 0;
    if (event.wheelDelta) delta = event.wheelDelta / 120;
    else if (event.detail) delta = -event.detail / 3;

    handle(delta);
    if (event.preventDefault) event.preventDefault();
    event.returnValue = false;
}

var goUp = true;
var end = null;
var interval = null;

function handle(delta) {
  var animationInterval = 11; //lower is faster
  var scrollSpeed = 10; //lower is faster

	if (end == null) {
  	end = $(window).scrollTop();
  }
  end -= 20 * delta;
  goUp = delta > 0;

  if (interval == null) {
    interval = setInterval(function () {
      var scrollTop = $(window).scrollTop();
      var step = Math.round((end - scrollTop) / scrollSpeed);
      if (scrollTop <= 0 || 
          scrollTop >= $(window).prop("scrollHeight") - $(window).height() ||
          goUp && step > -1 || 
          !goUp && step < 1 ) {
        clearInterval(interval);
        interval = null;
        end = null;
      }
      $(window).scrollTop(scrollTop + step );
    }, animationInterval);
  }
}

});
