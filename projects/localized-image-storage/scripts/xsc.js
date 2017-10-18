/*jshint esversion: 6 */
let container;

function saveImages(name, value) {
    if (typeof(Storage) !== undefined) {
        localStorage.setItem(name, value);
    }
    else {
        alert("LocalStorage is not supported on your browser");
    }
}

function loadStorage() {
    let elem;
    var keys = Object.keys(localStorage),
        i = 0,
        key;
    for (; key = keys[i]; i++) {
        let source = localStorage.getItem(key);
        elem = $('<img>', {"id": key, "src": source});
        container.append(elem);
    }
}

$(function() {
    "use strict";
    const create_btn = $("#createImage");
    const save_btn = $("#saveImages");
    const inputUrl = $("#ImageUrl");
    const inputName = $("#imageName");
    container = $(".images-container");
    loadStorage();

    var createThisImage = function(name, url) {
        if ((name === "" && url === "") || (url === "")) { // Name & URL is empty - pop alert OR URL is empty but there is provided name still pop alert
            alert(" - expected input");
        }
        else if (name === "" || document.getElementById(name)) { // Name is empty or already exists then create a guid to set it as the name
            name = guid();
            name = new Image(url, name);
            name.createImage();
        }
        else { // There is a provided Name that's not existing and URL is not Empty
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
