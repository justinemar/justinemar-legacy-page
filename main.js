

function cssEffect(pos,elem,aclass){
    $(window).scroll(function(){
        
        if($(window).scrollTop() > pos){
        $(elem).addClass(aclass);
    }else{
        $($(elem)).removeClass(aclass);
    }
    })
}



$(document).ready(function(){
    $(this).scrollTop(0); // Force page to get on top when reload
    $("button").click(function(){
        $(".msg-box").fadeOut();
    });
    
    cssEffect(300,".parallax-1","blur");

});
