<<<<<<< HEAD
    var config = {
        apiKey: "AIzaSyAKu1os4pi3oY7ThPvVeNefdWdXHRldy9Y",
        authDomain: "work-space-161100.firebaseapp.com",
        databaseURL: "https://work-space-161100.firebaseio.com",
        storageBucket: "work-space-161100.appspot.com",
        messagingSenderId: "904019024650"
    };

    firebase.initializeApp(config);
=======
var config = {
    apiKey: "AIzaSyAKu1os4pi3oY7ThPvVeNefdWdXHRldy9Y",
    authDomain: "work-space-161100.firebaseapp.com",
    databaseURL: "https://work-space-161100.firebaseio.com",
    storageBucket: "work-space-161100.appspot.com",
    messagingSenderId: "904019024650"
};

firebase.initializeApp(config);

var database = firebase.database();

>>>>>>> 89a0937a2c7e1fc42c25b89b043a88d96d36ccbc
var team = {
<<<<<<< HEAD
<<<<<<< HEAD
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

<<<<<<< HEAD
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
=======
                    //team.createWO(); !uncomment when we make this!!!!!
                    // team.test();
>>>>>>> 89a0937a2c7e1fc42c25b89b043a88d96d36ccbc
    },
    onDisconnect: function () {
                    team.username = JSON.parse(localStorage.getItem('username'));
                    team.database.ref('users/'+ team.username + "/status").onDisconnect().set("offline");
    },//end onDisconnect
};// end of team object
=======
database: firebase.database(),
username: '',
work: [],
initiate: function() {

    team.username = JSON.parse(localStorage.getItem('username'));
    console.log(team.username);
    var updates = {};
    updates['users/' + team.username + '/status'] = 'online';
    team.database.ref().update(updates);
    team.database.ref('users/' + team.username).once('value', function(snap) {
        console.log(snap.val());
        team.addWorkOrders();
        team.onDisconnect();
    });
>>>>>>> 7be900bcf5774a086d1a6de5d052ae7861169df3
=======
    database: firebase.database(),
    username: '',
    work: [],

    initiate: function() {
>>>>>>> dc1baae9282a0e98086b54cb5585e090918461fb

        team.username = JSON.parse(localStorage.getItem('username'));
        console.log(team.username);
        var updates = {};
        updates['users/' + team.username + '/status'] = 'online';
        team.database.ref().update(updates);
        // team.database.ref("work/").on("value", function(snap){
        //     snap.forEach(function(childsnap){
        //         console.log(childsnap.val());
        //     })
        // });
        team.database.ref('users/' + team.username).once('value', function(snap) {
            console.log(snap.val());
            team.addWorkOrders();
            team.onDisconnect();
        });

        //team.createWO(); !uncomment when we make this!!!!!
        // team.test();
    },
    onDisconnect: function() {
        team.username = JSON.parse(localStorage.getItem('username'));
        team.database.ref('users/' + team.username + "/status").onDisconnect().set("offline");
    }, //end onDisconnect


    addWorkOrders: function() {

        // team.database.ref().
        // team.initiate();
        // adding work-space firebase     
        var workRef = database.ref('work');

        workRef.on("value", function(snapshot) {
             $("#w-o-issued").empty(); // this may need to be moved

            snapshot.forEach(function(childsnapshot) {
                var childData = childsnapshot.val();

                console.log(team.username);
                if (team.username === childData.assign) {
                    console.log(childData.comment);
                    var comments = childData.comment;
                    
                    newDiv = $("<div>");
                    newButComplete = $("<button>");
                    newButComplete.attr("class", "commit");
                    newButComplete.val(childData.ref);
                    newButComplete.attr("key", childData.key);
                    newButComplete.html("ADD COMMENT");


                
                    newDiv.append(
                        '<ul class="list-group">'

                        + '<li class="list-group-item">' + childData.key + '</li>' + '<li class="list-group-item">' + childData.date + '</li>' + '<li class="list-group-item" id="workOrder">' + childData.task + '</li>'

                        + '<label for="comment" id="newComment">COMMENT<br> </label>' + '<input class="form-control" id="' + childData.ref + '"  type="text">' + '</ul>');
                    newDiv.append(newButComplete);





                    // $("#comment").val(childData.ref);

                    $("#w-o-issued").append(newDiv);
                    $("#workOrder").attr("id", "wO" + childData.ref);

                           for(var i = 1; i < comments.length; i++){
                        // newC = $("<div>");  
                        // newC = $("<div class='form-control'>");
                        newC = $("<li>");
                         // newComment.text(comments[i]);
                         newC.html("COMMENT#"+[i] + ":" + " " + comments[i]);
                         $('#wO' + childData.ref).append(newC);
                         console.log(childData.ref);

                    }


                 


                    $(".commit").on("click", function() {

                        // event.preventDefault();
                        var butValue = $(this).val();
                        var comment = $("#" + butValue).val();
                        comment = comment.toUpperCase();
                        var newLine = $("<div class='form-control'>");
                        newLine.html(comment);
                        var keyValue = $(this).attr("key");
                        console.log(keyValue);

                        if (comment.length > 0) {
                            $("#wO" + butValue).append(newLine);
                            // team.database.ref("work/" + keyValue).once("value", function(snap) {
                            //     console.log(snap.val());
                            //     var butObject = new Object();
                            //     butObject.issuer = snap.val().issuer;
                            //     butObject.assign = snap.val().assign;
                            //     butObject.date = snap.val().date;
                            //     butObject.ref = snap.val().ref;
                            //     butObject.task = snap.val().task;
                            //     butObject.comment = snap.val().comment;
                            //     butObject.key = snap.val().key;
                            //     butObject.comment.push(comment);
                            //     console.log(butObject);
                            //     var updates = {};
                            //     updates['work/'+ butObject.key] = butObject;
                            //     team.database.ref().update(updates);
                            }

                               team.database.ref("work/" + keyValue).once("value", function(snap) {
                                console.log(snap.val());
                                var butObject = new Object();
                                butObject.issuer = snap.val().issuer;
                                butObject.assign = snap.val().assign;
                                butObject.date = snap.val().date;
                                butObject.ref = snap.val().ref;
                                butObject.task = snap.val().task;
                                butObject.comment = snap.val().comment;
                                butObject.key = snap.val().key;
                                butObject.comment.push(comment);
                                console.log(butObject);
                                var updates = {};
                                updates['work/'+ butObject.key] = butObject;
                                team.database.ref().update(updates);
                            });

                            $("input").val("");


                  

                            //  need to reference object in database and add to it
                            // team.database.ref().push({
                            //    woObject.comment: comment 
                            // });
                            console.log(team.database.comment)
                            console.log(childData.comment);

                        

                    });

                };


            });

        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

    }, //  end of work order function
}; // end of team object




$(document).ready(team.initiate);


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




// search stack exchange function
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
        var url = "https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&answers=2&title=";
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

// set attribute function
$("<a>").on("click", function(event) {

    $("<a>").attr("target", $("#srchDisplay"));

})
<<<<<<< HEAD








<<<<<<< HEAD
})
=======






//Ben's suggestion
// var query = new Object();
// var url = [endpointURL?];
// query.key = value;  adds to the object query
// url += $.param(query);  passes the object to the param function that builds the query url titled url
>>>>>>> 7be900bcf5774a086d1a6de5d052ae7861169df3
=======
>>>>>>> dc1baae9282a0e98086b54cb5585e090918461fb
