
/*
Still a messy code , will try to test my refactoring skills again
    You can help if you want 
    Pomodoro Clock by Justin Cantado
    From 10/6/17 - 10/7/17  
*/
    
    
var breakVal = 5; //The break length
var sessionVal = 25; //The session length
var timeLeft = 0;
var counter = 0;
var isPause = false;
var onSession = true;



$(document).ready(function(){
var timeInterval = setInterval(timer, 1000);
var $timeLeft = $("#timeleft");
var $currentTimer = $("#currentTimer");

function toMinute(s){
  var min = Math.floor(s / 60);
  var sec = s % 60;
  if(sec < 10){
      return min + ":" + "0" + sec;
  }else{
  return min + ":" + sec;
  }
}


function timer(){
  if(onSession){
  timeLeft = sessionVal * 60;
  $currentTimer.html("SESSION");
      if(!isPause){
          counter++;
          $($timeLeft).html(toMinute(timeLeft - counter));
          if(counter === timeLeft){
              counter = 0;
              onSession = false;
          }
      }
  }else{
  $currentTimer.html("BREAK");
    timeLeft = breakVal * 60;
      if(!isPause){
          counter++;
          $($timeLeft).html(toMinute(timeLeft - counter));
          if(counter === timeLeft){
              counter = 0;
              onSession = true;
          }
      }
  }
}


$(".increase").on('click', function(e) {
    e.preventDefault();
    if($(this).parent().is(".session-controllers") && onSession){
        sessionVal+=1;
        counter =0;
        $("#session-value").html(sessionVal);
    }else if($(this).parent().is(".break-controllers")){
        breakVal+=1; //allows change on value even on session to make changes visible to users
        if(!onSession){ //but only reset clock if not on session
        counter =0;
        }
        $("#break-value").html(breakVal);
    }
})

$(".decrease").on('click', function(e) {
    e.preventDefault();
    if($(this).parent().is(".session-controllers") && onSession){
        sessionVal-=1;
        counter =0;
        $("#session-value").html(sessionVal);
    }else if($(this).parent().is(".break-controllers")){
        breakVal-=1;
        if(!onSession){
        counter =0;
        }
        $("#break-value").html(breakVal);
    }
})



$(".clock-ui").on('click', function(e){
    e.preventDefault();
    if(isPause){
        isPause = false;
    }else{
        isPause = true;
    }
})


})

  
      

var getQuote = setInterval(function(){
    $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        post.content = post.content.slice(3, -5);
        $('#random-quote').hide().html(post.content).fadeIn("slow");
        //var twitterBtn = $(".twitter-share-button"); future use
        var url = "https://twitter.com/intent/tweet?text=" + $('#random-quote').text();
        //twitterBtn.attr('href', url); future use
        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');
        }
      },
      cache: false
    });
},7000)



























