    var config = {
        apiKey: "AIzaSyAKu1os4pi3oY7ThPvVeNefdWdXHRldy9Y",
        authDomain: "work-space-161100.firebaseapp.com",
        databaseURL: "https://work-space-161100.firebaseio.com",
        storageBucket: "work-space-161100.appspot.com",
        messagingSenderId: "904019024650"
    };

    firebase.initializeApp(config);
var team = {
    database: firebase.database(),
    username: '',
    work: [],
    initiate:   function() {
                    
                    team.username = JSON.parse(localStorage.getItem('username'));
                    // console.log(team.username);
                    var updates = {};
                    updates['users/' + team.username + '/status'] = 'online';
                    team.database.ref().update(updates);
                    team.database.ref('users/'+ team.username).once('value', function(snap){
                        // console.log(snap.val());

                    });

                    team.displayWO();
    },
    displayWO:  function() {

                    team.database.ref('users/' + team.username + '/assignments').on('value', function(snap){
                        
                        // console.log(snap.val());
                        
                        // $('#w-o-issued').empty();
                        snap.forEach(function(child){
                            // console.log(child.val().key);
                            team.work.push(child.val().key);

                        });// end of forEach
                        console.log(team.work);
                        for (var i =0; i < team.work.length; i++){
                            team.database.ref('work/' + team.work[i]).once('value', function(snap){
                                var issuer = snap.val().issuer;
                                var assigned = snap.val().assigned;
                                var date = snap.val().date;
                                var ref = snap.val().ref;
                                var task = snap.val().task;
                                var key = snap.val().key;
                                // create button for accordion
                                var newBtn = $('<button data-toggle="collapse" class="accordion">' + 
                                                ref + '</button>');
                                // assign href
                                newBtn.attr('href', '#' + ref);
                                // append button
                                $('#w-o-list').append(newBtn);
                                // create accordion panel
                                var newDiv = $('<div class="panel-collapse collapse">');
                                // assign id for href above
                                newDiv.attr('id', ref);
                                // firebase key value for reference
                                newDiv.attr('key', key);
                                // create table of information for work order
                                var newTable = $('<table>');
                                var newThead = $('<thead>');
                                var newTbody = $('<tbody>');
                                var newData = $('<tr><th><h3>Issuer: ' + issuer + '</h3></th></tr>');
                                newThead.append(newData);
                                var newData = $('<tr><th><h3>Assigned: ' + assigned + '</h3></th></tr>');
                                newThead.append(newData);
                                var newData = $('<tr><th><h3>Date: ' + date + '</h3></th></tr>');
                                newThead.append(newData);
                                var newData = $('<tr><th><h3>Reference: ' + ref + '</h3></th></tr>');
                                newThead.append(newData);
                                var newData = $('<tr><td><h3>Task: ' + task + '</h3></td></tr>');
                                newTbody.append(newData);
                                // assemble table
                                newTable.append(newThead);
                                newTable.append(newTbody);
                                newDiv.append(newTable);
                                // append panel 
                                $('#w-o-issued').append(newDiv);
                            });// end of on work
                        }; // end for loop
                    });// end of on assignments
    },
};// end of team object

$(document).ready(function() {
    team.initiate();



    var database = firebase.database();

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