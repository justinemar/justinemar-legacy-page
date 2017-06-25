$(document).ready(function(){
	$(".task-desc").hide();

    $(".yt").hover(function(){
    $(".yt-task-desc").toggle('Bind');
	});
    
    $(".google").hover(function(){
    $(".google-task-desc").toggle('Bind');
    });

	$(".odin-box").click(function(){
		$(".odin-box-content").toggle('Drop');
	});

	$(".about-box").click(function(){
		$(".about-box-content").toggle('Drop');
	});



	
});


