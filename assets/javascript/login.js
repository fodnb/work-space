var config = {
  apiKey: "AIzaSyAKu1os4pi3oY7ThPvVeNefdWdXHRldy9Y",
  authDomain: "work-space-161100.firebaseapp.com",
  databaseURL: "https://work-space-161100.firebaseio.com",
  storageBucket: "work-space-161100.appspot.com",
  messagingSenderId: "904019024650"
};

firebase.initializeApp(config);

var database = firebase.database();

/*
//option to bring up navigation screen on event

function loadNav() {
	$("#imageBG").empty();

	//create centered Div with separated links to manager's view html, and
	//tech view html.

	var linkDiv = $("<div class='linkDiv col-sm-4'>");
	var manView = $("<a>").attr("href", "leader.html").text("Manager's view");
	linkDiv.append(manView);
	linkDiv.append(" | ")
	var techView = $("<a>").attr("href", "team.html").text("Tech's view");
	linkDiv.append(techView);
	$("#imageBG").append("<div class='col-sm-4'>");
	$("#imageBG").append(linkDiv);
}*/


//onclick event for login button
$("#loginButton").on("click", function () {
	//get values from input fields
	var userPermission = $("input[name='optradio']:checked").val();
	var username = $("#username").val().trim();
	var password = $("#password").val().trim();


	//function tells user if inputs are empty
	if (userPermission === undefined) {
		$("#alert").show();
	}
	else if (username === "" || password === "") {
		$("#alert").show();
	}
	//function will send user to leader.html if their account info matches stored object
	else if (userPermission === "manager") {
		database.ref().once('value').then(function(snapshot) {
		 	snapshot.forEach(function(childSnapshot) {
		 		if (username === childSnapshot.child("username").val()) {
		 			if (
		 				password === childSnapshot.child("password").val() &&
		 				userPermission === childSnapshot.child("userPermission").val()
		 				) {
		 					window.location.href = "leader.html";
		 					return true
		 			}
		 			else {
		 					$("#alert").show();
		 			}
		 		}
		 	});
		 });
	}
	//function will send user to leader.html if their account info matches stored object
	else if (userPermission === "tech") {
		 database.ref().once('value').then(function(snapshot) {
		 	snapshot.forEach(function(childSnapshot) {
		 		if (username === childSnapshot.child("username").val()) {
		 			if (
		 				password === childSnapshot.child("password").val() &&
		 				userPermission === childSnapshot.child("userPermission").val()
		 				) {
		 					window.location.href = "team.html";
		 					return true
		 			}
		 			else {
		 					$("#alert").show();
		 			}
		 		}
		 	});
		 });
	}

});