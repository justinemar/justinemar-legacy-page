
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



$(".clock-ui").on('click', function(e){
    e.preventDefault();
    if(isPause){
        isPause = false;
    }else{
        isPause = true;
    }
})


    $(".increase").on('click', function(e){
        e.preventDefault();
    if(isPause){
        if($(this).parent(".session-controllers")){
            sessionVal +=1;
            $(this).parent().children("#session-value").html(sessionVal);
        }else if($(this).parent(".break-controllers")){
            breakVal +=1;
            $(this).parent().children("#break-value").html(breakVal);
        }
    }else{
        alert("Pause the timer before changing time length!");
    }
    
    })


})































