       
       
       /*cards*/
       var nrCard = 3; 
        var IntSeconds = 4;

        function Load()
        {
            nrShown = 0;    
            Vect = new Array(nrCard + 10);
            Vect[0] = document.getElementById("card-1");
            Vect[0].style.visibility = "visible";

            document.getElementById("s" + 0).style.visibility = "visible";

            for (var i = 1; i < nrCard; i++)
            {
                Vect[i] = document.getElementById("card-" + (i + 1));
                document.getElementById("s" + i).style.visibility = "visible";
            }

            document.getElementById("s" + 0).style.backgroundColor = "rgba(255, 255, 255, 0.90)";
    

            mytime = setInterval(Timer, IntSeconds * 1000);
        }
        function Timer()
        {
            nrShown++;
            if (nrShown == nrCard)
                nrShown = 0;
            
        }
        //next img
        function next()
        {
            nrShown++;
            if (nrShown == nrCard)
                nrShown = 0;
            Effect();

            clearInterval(mytime);
            mytime = setInterval(Timer, IntSeconds * 1000);
        }
        function prev()
        {
            nrShown--;
            if (nrShown == -1)
                nrShown = nrCard -1;
            Effect();

            clearInterval(mytime);
            mytime = setInterval(Timer, IntSeconds * 1000);
        }
      
        function Effect()
        {
            for (var i = 0; i < nrCard; i++)
            {
                Vect[i].style.opacity = "0";  
                Vect[i].style.visibility = "hidden";

                document.getElementById("s" + i).style.backgroundColor = "rgba(0, 0, 0, 0.70)";
              
            }
            Vect[nrShown].style.opacity = "1";
            Vect[nrShown].style.visibility = "visible";
            document.getElementById("s" + nrShown).style.backgroundColor = "rgba(255, 255, 255, 0.90)";
           
        }


