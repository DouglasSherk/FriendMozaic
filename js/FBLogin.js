<div id="fb-root"></div>
        <script>
            window.fbAsyncInit = function() {
            FB.init({
                appId      : '158930817550508', // App ID
                channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel File
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
            });

        // Additional initialization code here
        };

        // Load the SDK Asynchronously
        (function(d) {
            var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            d.getElementsByTagName('head')[0].appendChild(js);
            }(document));
        </script>
            FB.init({appId: '158930817550508'});
                
    function login() {
        FB.login(function(response) {
            if (response.authResponse) {
                init();
            } else {
                alert('Login Failed!');
            }
        });
    }
 
    function init() {
      FB.api('/me', function(response) {
          $("#username").html("<img src='https://graph.facebook.com/" + response.id + "/picture'/><div>" + response.name + "</div>");

        
          $("#jfmfs-container").jfmfs({ 
              max_selected:999, 
              max_selected_message: "{0} of {1} selected",
              friend_fields: "id,name,last_name",
              sorter: function(a, b) {
                var x = a.last_name.toLowerCase();
                var y = b.last_name.toLowerCase();
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
              }
          });
          $("#jfmfs-container").bind("jfmfs.friendload.finished", function() { 
              window.console && console.log("finished loading!"); 
          });
          $("#jfmfs-container").bind("jfmfs.selection.changed", function(e, data) { 
              window.console && console.log("changed", data);
          });                     
          
          $("#logged-out-status").hide();
          $("#show-friends").show();

      });
    }
    
    var friendURL = new Array();   

    $("#show-friends").live("click", function() {

        window.console && console.log("in showfriends!"); 
        
        var friendIds = new Array();
        var friendSelector = $("#jfmfs-container").data('jfmfs');             

        friendIds = friendSelector.getSelectedIds();

        window.console && console.log("in showfriends!"); 

        for (var i = 0; i < friendIds.length; i++){
            friendURL[i] = "https://graph.facebook.com/" + friendIds[i] + "/picture";
            window.console && console.log(friendURL[i]);
        } 

        window.console && console.log("in showfriends3!"); 

        $("#selected-friends").html(friendIds().join(','));

        window.console && console.log("in showfriends4!"); 
    });
        </script>
        
        