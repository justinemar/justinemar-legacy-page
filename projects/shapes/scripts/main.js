


$(document).ready(function(){
    //Some game ui animation//
    var introCircle = $(".shapes-animated #circle");
    var introParallel = $(".parallelogram");
    var introSquare = $(".shapes-animated #square");
    introCircle.css("top","0px");
    introSquare.css("right","0px");
    //----------------------------//
    var gameMain = $(".game-main-ui");
    var playBtn = $("#play-game");
    $(playBtn).on('click', function(){
        $('.game-start-ui').fadeOut();
        gameMain.css("visibility","visible").hide().fadeIn(3000);
    });
    var toolContent = $('.tool-content');
    var workspace = $(".workspace");
    
    draggable(toolContent,workspace);

    
    $('.workspace').droppable({
        accept: toolContent,
        drop: function(event,ui){
        var shape = $(ui.helper).clone();
        shape.draggable({
            containment: workspace,
            stack: '.tool-content',
            snap: true,
            snapMode: 'outer',
            snapTolerance: 13,
        });
        $(this).append(shape);
    }
    })
    
    
	$('.tool-box').on('mousedown', function () {
		$('.instruction').fadeOut('slow');
	})



})

function draggable(toolContent,workspace){
    	toolContent.draggable({
		containment: workspace,
		stack: '.tool-content',
		snap: true,
		snapMode: 'outer',
		snapTolerance: 13,
		helper: 'clone',
	});
}


