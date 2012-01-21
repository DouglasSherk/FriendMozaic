$(document).ready(function() {
    var paths = ["res/img/stock1.jpg", "res/img/stock2.jpg"];
    var context = document.getElementById("newPicture").getContext("2d");
    context.fillStyle = "#00FF00";
    context.fillRect(0, 0, 50, 50);
    context.fillStyle = "#FF0000";
    context.fillRect(50, 0, 50, 50);

    var image = new Image();
    image.src = "http://google.ca/images/srpr/logo3w.png";
    image.onload = function() {
        context.drawImage(image, 0, 50, 50, 50);
    };

    function tile(profilePic, friendPictures) {
        for (var picture in friendPictures) {
            
        }
    }

    tile("res/img/stock1.jpg", paths);
});
