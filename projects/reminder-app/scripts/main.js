let datetime,
    date;
let getTime = function() {
    date = moment(new Date())
    datetime.innerHTML = date.format('dddd, MMMM Do YYYY, h:mm:ss a');
};




$(function() {
    let greetUser = document.getElementById('message');
    let userName = localStorage.getItem('username');
    greetUser.innerHTML += userName;
    let saveSetName;
    let reminderNodeTxt;
    datetime = document.getElementById('date-year'); // re-assign
    let settingSaved = document.getElementById('setting-btn'); // to add event listener

    // Check if user visited before //
    var UserfirstVisit = function() {
        let firstTime;
        let setting = document.getElementById('setting');
        localStorage.getItem('firstVisit') == 'false' ? setting.style.display = 'none' : firstTime = false;
        if (!firstTime) {

        }
    };
    UserfirstVisit();
    getTime();
    setInterval(getTime, 1000); //Update time



    let $reminderSection = $("#reminder-section-set"); //Dynamic set elements container

    //Use Event delegation for our dynamic elements//

    $(document).on('click', '.save-reminder-button', function() {
        const setID = $(this).parent().parent().attr('id');
        saveSetName = $(this).parent().siblings().children('h1').text();
        let reminderList = $(this).parent().parent().children(".reminder-lists").children(); //get the reminder-lists children
        if (reminderList.length <= 0) {
            return false;
        }
        else {
            let newSet = new ReminderSet(setID); // Create the set
            $(reminderList).each(function(i, e) {
                reminderNodeTxt = $(e).text(); //set txt to the elem text node
                newSet.add(new Reminder(reminderNodeTxt, saveSetName)); // create and add each text node to the save set reminders
                return true;
            });
        }
    });
    var checkEmptyList = function() {
        let targetElem = $('.reminder-lists');
        let setID;
        if(targetElem.children().length <= 0){
            setID = targetElem.parent().attr('id');
            console.log(targetElem);
            localStorage.removeItem(setID);
        }
    
    }
    $(document).on('click', '.delete-reminder', function() {
        saveSetName = $(this).parent().parent().siblings().children('h1').text();
        let fromSet = $(this).parent().parent().parent().attr('id');
        let reminder = $(this).parent().text();
        let list = $(this).parent().parent().children();
        let updateSet = new ReminderSet(fromSet);
        $(list).each(function(i, e) {
            reminderNodeTxt = $(e).text(); //set txt to the elem text node
            if (reminderNodeTxt === reminder) {
                $(e).remove();
                checkEmptyList();
            } else {
                updateSet.add(new Reminder(reminderNodeTxt, saveSetName));
                checkEmptyList();// create and add each text node to the save set reminders
            }
        });
    });

    $(document).on('click', '.add-new-reminder', function() {
        const value = $(this).siblings('input').val(); //get the value of input
        const targetContainer = $(this).parent().parent().children(".reminder-lists");
        if (value.trim() === '')
            alert("You didn't type anything");
        else
            targetContainer.prepend($('<div/>')
                .addClass('a-reminder').attr('contenteditable', 'false').text(value).append($('<div/>').addClass('delete-reminder').attr('contenteditable', false))).hide().fadeIn();
    });
    
    // model //
    var ReminderSet = function(set_name) {
        this.set_name = set_name;
        this.reminders = [];

    };

    ReminderSet.prototype.add = function(reminder) {
        this.reminders.push(reminder);
        localStorage.setItem(this.set_name, JSON.stringify(this.reminders)) // Store the current object set name and serialized reminders
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
                        $('<div/>').addClass('create-reminder-control').append($('<button>').addClass('add-new-reminder').text("+ add new"), $('<input>').addClass('create-reminder-value').attr({ type: "text", placeholder: "get something done" })), $('<div/>').addClass('reminder-lists'), $('<div/>').addClass('save-control').append($('<button>').addClass('save-reminder-button').text('Save'))))
                //Get our key values //
                for (; array_index < array.length; array_index++) {
                    /*Select the element id */
                    $("#" + key).children('.reminder-lists').append($('<div/>').addClass('a-reminder').attr('contenteditable', 'true').text(array[array_index].description).append($('<div/>').addClass('delete-reminder').attr('contenteditable', false))) //Get the reminders
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
                $('<div/>').addClass('create-reminder-control').append($('<button>').addClass('add-new-reminder').text("+ add new"), $('<input>').addClass('create-reminder-value').attr({ type: "text", placeholder: "get something done" })), $('<div/>').addClass('reminder-lists'), $('<div/>').addClass('save-control').append($('<button>').addClass('save-reminder-button').text('Save'))));
    };

    var Reminder = function(description, set_title) {
        this.description = description;
        this.set_title = set_title;
    };





    settingSaved.addEventListener('click', function() {
        let defaultTxt = 'Enter your name here.';
        let settingInput = document.getElementById('input-huge');
        let InputTxtNode = settingInput.innerHTML;
        if (InputTxtNode === defaultTxt || "") {
            alert('Please fill up the input field');
        }
        else {
            localStorage.setItem('username', InputTxtNode);
            localStorage.setItem('firstVisit', false);
            $(this).parent().parent().parent().parent().fadeOut('slow');
        }
    })

    $('#create-set').on('click', function() {
        ReminderSet.createSet(); // call anonymous function
    });

});
