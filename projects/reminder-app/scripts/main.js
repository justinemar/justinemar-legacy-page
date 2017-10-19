let $reminderSection;
let datetime = null,
        date = null;

let getTime = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

function loadStorage() {
    var keys = Object.keys(localStorage),
        i = 0,
        key,
        array;
    for (; key = keys[i]; i++) {
     const source = localStorage.getItem(key);
        array = JSON.parse(source);
        let d =0;
           $reminderSection.append( $('<div/>').addClass('set').attr('id', key)
            .append( $('<div/>').addClass('set-title').append($('<h1>').attr('contenteditable', 'true').text(array[d].set_title)),
            $('<div/>').addClass('create-reminder-control').append($('<button>').addClass('add-new-reminder').text("+ add new"), $('<input>').addClass('create-reminder-value').attr({type:"text", placeholder:"get something done"}))
            , $('<div/>').addClass('reminder-lists'), $('<div/>').addClass('save-control').append($('<button>').addClass('save-reminder-button').text('Save'))) )
        for(; d < array.length; d++){
            console.log(array[d].description, array[d].set_title)
           $("#"+ key).children('.reminder-lists').append($('<div/>').addClass('a-reminder').text(array[d].description))
        }
        
    }

}



$(function() {

    datetime = $('#date-year');
    getTime();
    setInterval(getTime, 1000);
    //Create dynamic elements//
    $reminderSection = $("#reminder-section-set");
    loadStorage();
    $('#create-set').on('click', function() {
        var telement = $('.set');
        var count = 0;
        for(; count < telement.length + 1; count++){
            
        }
        $reminderSection.append( $('<div/>').addClass('set').attr('id', count)
            .append( $('<div/>').addClass('set-title').append($('<h1>').attr('contenteditable', 'true').text('Reminders')),
            $('<div/>').addClass('create-reminder-control').append($('<button>').addClass('add-new-reminder').text("+ add new"), $('<input>').addClass('create-reminder-value').attr({type:"text", placeholder:"get something done"}))
            , $('<div/>').addClass('reminder-lists'), $('<div/>').addClass('save-control').append($('<button>').addClass('save-reminder-button').text('Save'))) );
    });


    //Use Event delegation for our dynamic elements//
    $(document).on('click', '.set-name-button', function() {
    
    });

    $(document).on('click', '.save-reminder-button', function() {
        var setID = $(this).parent().parent().attr('id');
        var saveSetName = $(this).parent().siblings().children('h1').text();
        var reminderList = $(this).parent().parent().children(".reminder-lists").children(); //get the reminder-lists children
        var newSet = new ReminderSet(setID); // Create the set
        $(reminderList).each(function(i, e) {
            var txt = $(e).text(); //set txt to the elem text node
                console.log(txt, saveSetName)
                newSet.add(new Reminder(txt, saveSetName)); // create and add each text node to the save set reminders
                
        });

    });
    
    $(document).on('click', '.add-new-reminder', function() {
        var value = $(this).siblings('input').val(); //get the value of input
        var target = $(this).parent().parent().children(".reminder-lists");
        target.prepend($('<div/>')
                .addClass('a-reminder').text(value)).hide().fadeIn();
    });


    var ReminderSet = function(set_name) {
        this.set_name = set_name; 
        this.reminders = [];
    };

    ReminderSet.prototype.add = function(reminder) {
        this.reminders.push(reminder);
        console.log(this.set_name, this.reminders)
        localStorage.setItem(this.set_name, JSON.stringify(this.reminders)) // Store the current object set name and serialized reminders
        return this;
    };

    ReminderSet.prototype.list = function() {
        console.log(this.reminders); 
    };

    var Reminder = function(description,set_title) {
        this.description = description;
        this.set_title = set_title;
        //Describes the reminder
    };




});


