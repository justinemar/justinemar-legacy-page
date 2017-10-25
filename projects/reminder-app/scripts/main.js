let datetime,
    date;
var getTime = function() {
    date = moment(new Date());
    datetime.innerHTML = date.format('dddd, MMMM Do YYYY, h:mm:ss a');
};




$(function() {
    getRandomBackground();
    let targetContainer;
    datetime = document.getElementById('date-year'); // re-assign
    let settingSaved = document.getElementById('setting-btn'); // to add event listener
    let $reminderSection = $("#reminder-section-set"); //Dynamic set elements container
    // Check if user visited before //
    var userControl = function() {
        let greetings = [" you can do it! ", " show them what you got! ", " you're not alone! ", " you're capable of amazing things! ", " this is not fake news! you're doing well! ", " don't forget to take a break! ", " dream BIG ", " you're almost there! ", " never stop believing.., ", " take a deep breath and calm your mind.. ", " use the built in pomodoro clock to manage your time, ", " look how far you've come..", " where is your streght coming from?", " don't ever think that you can't do it", " carry on!", " never compare yourself to others.", " hey i just want to tell you how awesome you are", " free yourself from hatred, surround yourself with peace and love.", " just set your mind to it!", " get it done! i believe in you!", " HAHAHAHA, you are indeed one of a kind"];
        let randomGreet = greetings[Math.floor(Math.random() * greetings.length)];
        let setting = document.getElementById('setting');
        let greetUser = document.getElementById('message');
        let userName = localStorage.getItem('username');
        //Check if user visited before, true => hide the setting , false => setting is visible by default but hide other elems
        localStorage.getItem('visitedbefore') ? setting.style.display = 'none' : $(".greeting, .control").hide();
        greetUser.innerHTML = userName + randomGreet; // Greet null and not visible if no username is stored//
        settingSaved.addEventListener('click', function() {
            let defaultTxt = 'Enter your name here.';
            let settingInput = document.getElementById('input-huge');
            let InputTxtNode = settingInput.innerHTML;
            let name = InputTxtNode.substr(0, 1).toUpperCase() + InputTxtNode.substr(1);
            if (InputTxtNode === defaultTxt || "") {
                alert('Please fill up the input field');
            }
            else {
                $(this).parent().parent().parent().parent().fadeOut("fast");
                localStorage.setItem('username', name);
                localStorage.setItem('visitedbefore', false);
                greetUser.innerHTML = "How are you?, " + name;
                $(".greeting, .control").delay(800).fadeIn();
            }
        });

    };
    userControl();
    getTime(); //early invoke
    setInterval(getTime, 1000); //Update time

    //random bg's//

    function getRandomBackground() {
        var resourcesObject = [{
                "author": "Bildermeines",
                "images": ['./images/bildermeines/landscape-2130844.jpg', './images/bildermeines/milky-way-2076251.jpg', './images/bildermeines/nature-2484584.jpg', './images/bildermeines/port-2506025.jpg', './images/bildermeines/waterfall-2115206.jpg']
            },
            {
                "author": "Jez Timms",
                "images": ['./images/jeztimms/jez-timms-157465.jpg', './images/jeztimms/jez-timms-158151.jpg', './images/jeztimms/jez-timms-178355.jpg']
            },
            {
                "author": "Lubos Houska",
                "images": ['./images/luboshouska/city-1134141.jpg', './images/luboshouska/prague-1168302.jpg']
            },
            {
                "author": "oadtz",
                "images": ['./images/oadtz/bangkok-1897718.jpg', './images/oadtz/electricity-1835546.jpg', './images/oadtz/star-1908593.jpg']
            },
            {
                "author": "quangle",
                "images": ['./images/quangle/ham-ninh-1050828.jpg', './images/quangle/sunrise-1014711.jpg']
            },
            {
                "author": "skeeze",
                "images": ['./images/skeeze/eiffel-tower-1156146.jpg', './images/skeeze/monument-valley-1593318.jpg', './images/skeeze/mountains-2228259.jpg']
            }
        ];

        var selectobj = resourcesObject[Math.floor(Math.random() * resourcesObject.length)].images;
        var randomImgIndex = selectobj[Math.floor(Math.random() * selectobj.length)];
        document.body.style.backgroundImage = "url(" + "'" + randomImgIndex + "')";
    }

    //Use Event delegation for our dynamic elements//

    $(document).on('click', '.delete-reminder', function() {
        targetContainer = $(this).parent().parent();
        let saveSetName = $(this).parent().parent().siblings().children('h1').text();
        let fromSet = $(this).parent().parent().parent().attr('id');
        let reminder = $(this).parent().text();
        let list = $(this).parent().parent().children();
        let updateSet = new ReminderSet(fromSet);
        $(list).each(function(i, e) {
            let reminderNodeTxt = $(e).text(); //set txt to the elem text node
            if (reminderNodeTxt === reminder) {
                $(e).remove();
            }
            else {
                updateSet.add(new Reminder(reminderNodeTxt, saveSetName));
            }

        });
        if ($("#" + fromSet).find('.reminder-lists').children().length <= 0) {
            localStorage.removeItem(fromSet);
        }
    });


    $(document).on('click', '.add-new-reminder', function() {
        let saveSetName = $(this).parent().siblings().children('h1').text();
        const error = $(this).siblings('.error-box');
        const value = $(this).siblings('input').val(); //get the value of input
        targetContainer = $(this).parent().parent().children(".reminder-lists");
        if (value.trim() === '') {
            error.fadeIn(1000).delay(200).fadeOut(2000);
        }
        else {
            targetContainer.prepend($('<div/>')
                .addClass('a-reminder').attr('contenteditable', 'false').text(value).append($('<div/>').addClass('delete-reminder').attr('contenteditable', false))).hide().fadeIn();
            const setID = $(this).parent().parent().attr('id');
            saveSetName = $(this).parent().siblings().children('h1').text();
            let reminderList = $(this).parent().parent().children(".reminder-lists").children(); //get the reminder-lists children
            let newSet = new ReminderSet(setID); // Create the set
            $(reminderList).each(function(i, e) {
                let reminderNodeTxt = $(e).text(); //set txt to the elem text node
                newSet.add(new Reminder(reminderNodeTxt, saveSetName)); // create and add each text node to the save set reminders
                return true;
            });
        }

    });

    // model //
    var ReminderSet = function(set_name) {
        this.set_name = set_name;
        this.reminders = [];

    };

    ReminderSet.prototype.add = function(reminder) {
        this.reminders.push(reminder);
        localStorage.setItem(this.set_name, JSON.stringify(this.reminders)); // Store the current object set name and serialized reminders
        return this;
    };

    // Loading saved sets //
    ReminderSet.loadSet = function() {
        let keys = Object.keys(localStorage),
            i = 0,
            key,
            array;
        try {
            for (; key = keys[i]; i++) {
                const setId = localStorage.getItem(key);
                array = JSON.parse(setId); //parse and store key values
                let array_index = 0;
                //Re-create the reminders and set their properties//

                $reminderSection.append($('<div/>').addClass('set').attr('id', key) //Set the ID                      
                    .append($('<div/>').addClass('set-title').append($('<h1>').attr('contenteditable', 'true').text(array[array_index].set_title)), //Index is always at 0//
                        $('<div/>').addClass('create-reminder-control').append($('<button>').addClass('add-new-reminder').text("+ add new"), $('<input>').addClass('create-reminder-value').attr({ type: "text", placeholder: "get something done" }), $('<div/>').addClass('error-box')), $('<div/>').addClass('reminder-lists')));
                //Get our key values //
                for (; array_index < array.length; array_index++) {
                    /*Select the element id */
                    $("#" + key).children('.reminder-lists').append($('<div/>').addClass('a-reminder').attr('contenteditable', 'true').text(array[array_index].description).append($('<div/>').addClass('delete-reminder').attr('contenteditable', false))); //Get the reminders
                } //end
            }
        }
        catch (exception) {
            console.log('Exception made', exception);
        }
    };
    ReminderSet.loadSet();


    // Creating a set //
    ReminderSet.createSet = function(id) {
        id = document.getElementsByClassName('set').length;
        id += 1;
        $reminderSection.append($('<div/>').addClass('set').attr('id', id)
            .append($('<div/>').addClass('set-title').append($('<h1>').attr('contenteditable', 'true').text('Name this reminder')),
                $('<div/>').addClass('create-reminder-control').append($('<button>').addClass('add-new-reminder').text("+ add new"), $('<input>').addClass('create-reminder-value').attr({ type: "text", placeholder: "get something done" }), $('<div/>').addClass('error-box')), $('<div/>').addClass('reminder-lists')));


    };

    var Reminder = function(description, set_title) {
        this.description = description;
        this.set_title = set_title;
    };







    $('#create-set').on('click', function() {
        ReminderSet.createSet(); // call anonymous function
    });

});
