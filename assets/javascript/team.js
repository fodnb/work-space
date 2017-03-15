var config = {
    apiKey: "AIzaSyAKu1os4pi3oY7ThPvVeNefdWdXHRldy9Y",
    authDomain: "work-space-161100.firebaseapp.com",
    databaseURL: "https://work-space-161100.firebaseio.com",
    storageBucket: "work-space-161100.appspot.com",
    messagingSenderId: "904019024650"
};

firebase.initializeApp(config);

var database = firebase.database();

var team = {
    database: firebase.database(),
    username: '',
    work: [],
    initiate:   function() {
                    
                    team.username = JSON.parse(localStorage.getItem('username'));
                    console.log(team.username);
                    var updates = {};
                    updates['users/' + team.username + '/status'] = 'online';
                    team.database.ref().update(updates);
                    team.database.ref('users/'+ team.username).once('value', function(snap){
                        console.log(snap.val());

                    });

                    //team.createWO(); !uncomment when we make this!!!!!
                    // team.test();
    },
    onDisconnect: function () {
                    team.username = JSON.parse(localStorage.getItem('username'));
                    team.database.ref('users/'+ team.username + "/status").onDisconnect().set("offline");
    },//end onDisconnect
};// end of team object

$(document).ready(function() {
    team.initiate();
    team.onDisconnect();

    // adding work-space firebase     

    // initializing button for searching for srchYouTube
    $("#srchYouTube").on("click", function(event) {
        var title = $("#youTube").val().trim();
        if (title.length > 0) {
            $("#srchDisplay").empty();
            event.preventDefault();

            console.log(title);
            var url = "https://www.googleapis.com/youtube/v3/search?q=";
            var key = "&key=AIzaSyAKu1os4pi3oY7ThPvVeNefdWdXHRldy9Y&part=snippet";
            var queryUrl = url + title + key;
            $.ajax({

                url: queryUrl,
                method: "GET"

            }).done(function(response) {
                console.log(response);
                console.log(response.items[0].id.videoId);

                // this variable holds the value of an embed video for youtube to pass into the iframe as a srchDisplay
                var youTubeVideo = "https://www.youtube.com/embed/" + response.items[0].id.videoId;
                console.log(youTubeVideo);

                var newVideo = $("<iframe>");
                newVideo.attr("src", youTubeVideo);
                $("#srchDisplay").append(newVideo);
                $("#youTube").val("");
            })

        }
    })


    // https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&title=windshield&site=mechanics&key=muJRZpFofGxd8uF9NSL7Kg((


    $("#srchStack").on("click", function(event) {
        $("#srchDisplay").empty();

        var stackTitle = $("#stack").val().trim();
        console.log(stackTitle.length);
        for (var d = 0; d < stackTitle.length; d++) {
            stackTitle = stackTitle.replace(" ", "+");
        }


        console.log(stackTitle + " StackTitle");
        event.preventDefault();

        if (stackTitle.length > 0) {
            var url = "https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&answers=2&title="; //changing advanced to similar
            var key = "&site=mechanics&key=muJRZpFofGxd8uF9NSL7Kg((";

            var queryUrl = url + stackTitle + key;
            console.log(queryUrl);
            console.log(stackTitle);

            $.ajax({

                url: queryUrl,
                method: "GET"
            }).done(function(response) {
                console.log(response);
                console.log(response.items[0].link);
                for (var i = 0; i < 10; i++) {
                    var stackLink = response.items[i].link;

                    var newDiv = $("<div>")
                    var newPage = $("<a>");

                    newPage.attr("href", stackLink);
                    newPage.attr("target", "blank");
                    newPage.html(stackLink);
                    newPage.html(response.items[i].title)
                    newPage.append(newDiv);
                    $("#srchDisplay").append(newPage);
                }
            })
        }
        $("#stack").val("");
    })


$("<a>").on("click", function(event){

    $("<a>").attr("target", $("#srchDisplay"));



})







})






//Ben's suggestion
// var query = new Object();
// var url = [endpointURL?];
// query.key = value;  adds to the object query
// url += $.param(query);  passes the object to the param function that builds the query url titled url
