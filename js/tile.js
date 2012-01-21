$(document).ready(function() {
    var uids = ["100003343000188", "510139148"];
    var imageData = new array();
    var context = document.getElementById("newPicture").getContext("2d");

    function processFriends(callback) {
        var tempCanvas = document.createElement("canvas");
        var tempContext = tempCanvas.getContext("2d");
        var count = uids.length, num = 0;
        for (var uid in uids) {
            var image = new Image();
            image.crossOrigin = 'anonymous';
            image.src = "https://graph.facebook.com/" + uid + "/picture?type=square";
            function imageLoaded(currentNum) {
                if (currentNum == count) {
                    callback();
                }
            }
            image.onload = function() {
                tempContext.drawImage(image, 0, 0, 50, 50);
                data = tempContext.getImageData(0, 0, 50, 50);

                var avR, avG, avB;
                for (var y = 0; y < 50; y++) {
                    for (var x = 0; x < 50; x++) {
                        var offset = (y * 50 + x) * 4; 
                        avR += data[offset];
                        avG += data[offset + 1];
                        avB += data[offset + 2];
                    }
                }

                avR = ~~(avR / 2500);
                avG = ~~(avG / 2500);
                avB = ~~(avB / 2500);
                imageData[uid] = [avR, avG, avB];

                imageLoaded(++num); 
            }
        }
    }
    
    function tile(profilePic) {
        var image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = "https://graph.facebook.com/" + profilePic + "/picture?type=large";
        image.onload = function() {
            var tempCanvas = document.createElement("canvas");

            var height;
            if (image.height % 50 >= 25) {
                height = image.height + 50;
            } else {
                height = image.height - (image.height % 50);
            }

            var width;
            if (image.width % 50 >= 25) {
                width = image.width - (image.width % 50) + 50;
            } else {
                width = image.width - (image.width % 50);
            }

            tempCanvas.height = height;
            tempCanvas.width = width;
            var tempContext = tempCanvas.getContext("2d");
            tempContext.drawImage(image, 0, 0, width, height);

            var imageData = tempContext.getImageData(0, 0, width, height);
            for (var boxY = 0; boxY < height / 50; boxX++) {
                for (var boxX = 0; boxX < width / 50; boxX++) { 
                    var avR, avG, avB;
                    for (var y = 0; y < 50; y++) {
                        for (var x = 0; x < 50; x++) {
                            var offset = ((boxY * 50 + y) * width + boxX * 50 + x) * 4;
                            avR += offset[0];
                            avG += offset[1];
                            avB += offset[2];
                        }
                    }
                    avR = ~~(avR/2500);
                    avG = ~~(avG/2500);
                    avB = ~~(avB/2500);
                }

                for (var uid in uids) {
                    
                }
            }
        };
    }

    processFriends();
    tile("512769141");
});
