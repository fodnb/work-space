$(document).ready(function() {
    var title;
    var url = "https://www.googleapis.com/youtube/v3/search?q=";
    var key = "key=AIzaSyAKu1os4pi3oY7ThPvVeNefdWdXHRldy9Y&part=snippet";
    var queryUrl = url + title + "&" + key;
    $.ajax({

        url: queryUrl,
        method: "GET"

    }).done(function(response) {
        console.log(response);
		console.log(response.items[0].id.videoId);
    })
})
