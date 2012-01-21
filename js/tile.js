//$(document).ready(function() {
    var tileX = 10;
    var tileY = 10;

    //var uids = ["100003343000188", "510139148", "715822810", "504072909", "1649640112"];
    var uids;
    var imgData = new Array();
    var originalData = new Array();

    function processFriends(callback) {
        var context = document.getElementById("newPicture").getContext("2d");

        var tempCanvas = document.createElement("canvas");
        var tempContext = tempCanvas.getContext("2d");
        var count = uids.length, num = 0;
        for (var uid in uids) {
            var image = new Image();
            image.src = "proxySquare.php?uid=" + uids[uid];
            image.uid = uids[uid];
            function imageLoaded(currentNum) {
                if (currentNum == count || currentNum % 5 == 0) {
                    callback();
                }
            }
            image.onload = function() {
                tempContext.drawImage(this, 0, 0, tileX, tileY);
                var pixels = tempContext.getImageData(0, 0, tileX, tileY);

                var avR = 0, avG = 0, avB = 0;
                for (var y = 0; y < tileY; y++) {
                    for (var x = 0; x < tileX; x++) {
                        var offset = (y * tileY + x) * 4; 
                        avR += pixels.data[offset];
                        avG += pixels.data[offset + 1];
                        avB += pixels.data[offset + 2];
                    }
                }

                avR = ~~(avR / 2500);
                avG = ~~(avG / 2500);
                avB = ~~(avB / 2500);
                imgData[this.uid] = [avR, avG, avB];
                originalData[this.uid] = pixels;

                imageLoaded(++num); 
            }
        }
    }
    
    function tile(profilePic) {
        var context = document.getElementById("newPicture").getContext("2d");

        //var image = new Image();
        //image.src = "proxyLarge.php?uid=" + profilePic;
        // Where we're currently writing the thumb to.
        context.drawImage(profilePic, 0, 0);
        var writeY = 0, writeX = 0;
        //image.onload = function() {
            var tempCanvas = document.createElement("canvas");

            var height;
            if (profilePic.height % tileY >= tileY / 2) {
                height = profilePic.height + tileY;
            } else {
                height = profilePic.height - (profilePic.height % tileY);
            }

            var width;
            if (profilePic.width % tileX >= tileX / 2) {
                width = profilePic.width - (profilePic.width % tileX) + tileX;
            } else {
                width = profilePic.width - (profilePic.width % tileX);
            }

            $(".contentslider").height(height);

            $("#newPicture").height(height);
            $("#newPicture").width(width);
            var tempContext = tempCanvas.getContext("2d");

            // Draw the person's profile picture for now, then replace it
            // gradually with friend pictures.
            context.drawImage(profilePic, 0, 0, width, height);

            var pixels = tempContext.getImageData(0, 0, width, height);
            for (var boxY = 0; boxY < height / tileY; boxY++) {
                for (var boxX = 0; boxX < width / tileX; boxX++) { 
                    var avR = 0, avG = 0, avB = 0;
                    for (var y = 0; y < tileY; y++) {
                        for (var x = 0; x < tileX; x++) {
                            var offset = ((boxY * tileY + y) * width + boxX * tileX + x) * 4;
                            avR += pixels.data[offset];
                            avG += pixels.data[offset + 1];
                            avB += pixels.data[offset + 2];
                        }
                    }
                    avR = ~~(avR/2500);
                    avG = ~~(avG/2500);
                    avB = ~~(avB/2500);

                    var lowestDistance = 9999999999;
                    var lowestDistanceUid = "";
                    for (var uid in uids) {
                        var friendData = imgData[uids[uid]];
                        if (friendData == null) {
                            continue;
                        }
                        var distance = Math.abs(friendData[0] - avR) + Math.abs(friendData[1] - avG) + Math.abs(friendData[2] - avB);

                        if (distance < lowestDistance) {
                            lowestDistance = distance;
                            lowestDistanceUid = uids[uid];
                        }
                    }

                    context.putImageData(originalData[lowestDistanceUid], writeX * tileX, writeY * tileY);
                    if (++writeX >= width / tileX) {
                        writeX = 0;
                        writeY++;
                    }
                }
            }
        //};
    }

    /*processFriends(function() {
        //tile("512769141");
        tile("douglas.sherk");
        //tile("1658071309");
        //tile("FrozenFires");
        //tile("hassaan.aamir");
    });*/

    function updatePicture() {

        FB.api('/me/albums', function(response) { 
            for (album in response.data) {
                if (response.data[album].name == "Profile Pictures") {
                    FB.api(response.data[album].id + "/photos", function(response) {
                        var image = response.data[0].images[0].source;
                        var profilePic = new Image();
                        profilePic.src = "proxyLarge.php?url=" + escape(image);
                        profilePic.onload = function() {
                            var friendSelector = $("#jfmfs-container").data("jfmfs");
                            uids = friendSelector.getSelectedIds();
                            if (uids.length > 0) {
                                processFriends(function() {
                                    tile(profilePic); 
                                });
                            }
                        }
                    });
                }
            }
        });
        
    }

//});
