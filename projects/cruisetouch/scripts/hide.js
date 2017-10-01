


window.onload = function(){
var close = false;
var $banner = document.getElementById('banner');
document.getElementById("banner-content").onclick = function(){
    if(close===false){
    $banner.style.marginLeft = "-94%";
    $banner.style.opacity = '0.1';
    close = true;
    }else if(close===true){
        $banner.style.marginLeft = "0";
        $banner.style.opacity = '1';
        close = false;
    }
};
};
