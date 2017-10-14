/*jshint esversion: 6 */


function saveImages(name, value) {
    if (typeof(Storage) !== undefined) {
        localStorage.setItem(name, value);
    }
    else {
        alert("LocalStorage is not supported on your browser");
    }
}

function loadStorage() {
    const container = $(".images-container");
    let elem;
    var keys = Object.keys(localStorage),
        i = 0,
        key;
    for (; key = keys[i]; i++) {
        elem = "<img src='' " + "id='" + key + "' />";
        $(container).append(elem);
        let thisImg = document.getElementById(key);
        let source = localStorage.getItem(key);
        $(thisImg).attr('src', source);
    }
}

$(function() {
    "use strict";
    loadStorage();
    const create_btn = $("#createImage");
    const save_btn = $("#saveImages");
    const inputUrl = $("#ImageUrl");
    const inputName = $("#imageName");
    const container = $(".images-container");


    var createThisImage = function(name, url) {
        if ((name === "" && url === "") || (url === "")) {
            alert(" - expected input");
        }
        else if (name === "" || document.getElementById(name)) { //if name exists or name is empty then create a random name
            name = guid();
            name = new Image(url, name);
            name.createImage();
        }
        else {
            name = new Image(url, name);
            name.createImage();
        }

    };


    $(create_btn).on('click', function() {
        var new_image = inputName.val();
        var source = inputUrl.val();
        createThisImage(new_image, source);
    });


    $('img').on('click', function() {
        const identity = $(this).attr('id');
        const isValidDeletion = confirm("Delete " + identity + "?");
        if (isValidDeletion) {
            localStorage.removeItem(identity);
            window.location.reload(true);
        }
    });



    function Image(url, name) {
        this.img_url = url;
        this.img_name = name;
    }

    Image.prototype.createImage = function() {
        let id = this.img_name;
        let elem = "<img src='' " + "id='" + id + "' />";
        $(container).append(elem);
        let thisImg = document.getElementById(id);
        thisImg.src = this.img_url;
        saveImages(this.img_name, this.img_url);
        window.location.reload(true);
    };


});









function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
