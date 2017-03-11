


$(document).ready(function() {


var config = {
    apiKey: "AIzaSyAKu1os4pi3oY7ThPvVeNefdWdXHRldy9Y",
    authDomain: "work-space-161100.firebaseapp.com",
    databaseURL: "https://work-space-161100.firebaseio.com",
    storageBucket: "work-space-161100.appspot.com",
    messagingSenderId: "904019024650"
  };
  
  firebase.initializeApp(config);

var database = firebase.database();

// adding work-space firebase     


// initializing button for searching for srchYouTube
$("#srchYouTube").on("click", function (event){
    event.preventDefault();
    var title =  $("#youTube").val().trim();
      console.log(title);
    var url = "https://www.googleapis.com/youtube/v3/search?q=";
    var key = "key=AIzaSyAKu1os4pi3oY7ThPvVeNefdWdXHRldy9Y&part=snippet";
    var queryUrl = url + title + "&" + key;
    $.ajax({

        url: queryUrl,
        method: "GET"

    }).done(function(response) {
        console.log(response);
		console.log(response.items[0].id.videoId);


      // $("#").attr("src", ("https://www.youtube.com/watch?v=" + title));

    $("#youTube").val("");
    $("#youTube").attr("placeholder", "search you tube");

    })
})

})
//Ben's suggestion
// var query = new Object();
// var url = [endpointURL?];
// query.key = value;  adds to the object query
// url += $.param(query);  passes the object to the param function that builds the query url titled url