

function addclass_scroll(pos,elem,_class){
    $(window).on('scroll',function(){
    if($(window).scrollTop() > pos)
        $(elem).addClass(_class);
    else
        $($(elem)).removeClass(_class);
    });
}



$(document).ready(function(){
    $(this).scrollTop(0); // Force page to get on top when reload
    $("button").click(function(){
        $(".msg-box").fadeOut();
    });
    addclass_scroll(300,".parallax-1","blur");
    addclass_scroll(235,".fake-header","nav-fixed")
    // Just a little fun
   var updateFollower = setInterval(function(){
         $(".count").first().text("1.2M");
    }, 500)
    
    
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
});
