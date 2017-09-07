$(document).ready(function(){

/* body faideIn effect*/
var loadSection = function(){
    $('body').css({"visibility":"visible", "opacity":"1"});
    $('body').fadeIn('slow');
}
    /* call */ loadSection();
    
    /* Greetings in different languages */
    var greetingElem = $("#greeting");
    /* Current array greetings languages */
    var lang = ['Kumusta!','Hello!','Bonjour!','Hola!','Ola!','Salaam!','Namaste!','Ni hao!',"Kon'nichiwa!",'Annyeonghaseyo','Shalom!','Bog!','Salut!'];
    var effect = setInterval(function() {
           $(greetingElem).fadeOut("slow", function(){
            var newWord = lang[Math.floor(Math.random() * lang.length)];
            greetingElem.html(newWord);
            $(greetingElem).fadeIn("slow");
        });
       }, 1000); /* Call function every 2 seconds */
   
   /* Header texts opacity change on scroll */
   var elems1 = $('#intro-text, .button-wrap, #greeting');
   var elems2 = [($('#about-intro')), ($('#about-content p')), ($('.portfolio-details ul'))];
   $(window).scroll(function(){
   if($(window).scrollTop()<80){
        elems1.stop(true,true).css("opacity","1");
   } else {
         elems1.stop(true,true).css("opacity","0.5"); 
        
   }
       if($(window).scrollTop()>200){
          elems2[0].stop(true,true).css({"opacity":"1", "margin-left":"5%"});
          elems2[1].stop(true,true).css({"opacity":"1", "margin-left":"0"});
       }
   });



    /* Adding default tab style */
   $(window).scroll(function(){
       var defaultTab = $('#rocket'); /* Default tab */
       if($(window).scrollTop()>900){
             elems2[2].stop(true,true).css({"opacity":"1", "margin-top":"0"});
             $(defaultTab).addClass("active");
          
       }
   })
   
   /* Portfolio section effects */
   
   var rocketContent  = $("div.rocket-content");
   var globeContent  = $("div.globe-content");
   var cubeContent  = $("div.cube-content");
   $('.btn').click(function() {
      $(this).toggleClass("active");
      $("li.active").removeClass("active");
     
      if($(this).is("#rocket")){
         $(globeContent).css("display","none");
         $(cubeContent).css("display","none");
         $(rocketContent).toggle("slide");
         $(rocketContent).addClass("activeContent");
      }else if($(this).is("#globe")){
         $(rocketContent).css("display","none");
         $(cubeContent).css("display","none");
         $(globeContent).toggle("slide");
         $(globeContent).addClass("activeContent");
      }else if($(this).is("#cubes")){
         $(rocketContent).css("display","none");
         $(globeContent).css("display","none");
         $(cubeContent).toggle("slide");
         $(cubeContent).addClass("activeContent");
      }
    });
    
   

   
    
    
});


