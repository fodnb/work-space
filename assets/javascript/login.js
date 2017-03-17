// firebase config
var config = {
  				apiKey: "AIzaSyAKu1os4pi3oY7ThPvVeNefdWdXHRldy9Y",
  				authDomain: "work-space-161100.firebaseapp.com",
  				databaseURL: "https://work-space-161100.firebaseio.com",
  				storageBucket: "work-space-161100.appspot.com",
  				messagingSenderId: "904019024650"
				};
// initialize firebase
firebase.initializeApp(config);
// login object
var login = {

	database: 	firebase.database(),

	launch: 	function(){
					//onclick event for login button
					$("#loginButton").on("click", function () {
						//get values from input fields
						var username = $("#username").val().trim();
						var password = $("#password").val().trim();
						var role = $("input[name='optradio']:checked").val();
						// calls the users object from the database
						login.database.ref('users/'+ username +'/').once('value',function(snap){
							console.log(snap.val());
							// if password is good
							if(snap.val().password === password &&
								snap.val().role === role){
								// console.log('good');
								//use local sorage to carry over the user value
								localStorage.setItem('username', JSON.stringify(username));
								// loads the html in the window
								if (snap.val().role === 'leader'){
									// console.log('is leader');
									window.location.href = 'leader.html';
								}
								if (snap.val().role === 'team'){
									// console.log('is team');
									window.location.href = 'team.html';
								}
							}
							else {
								$("#alert").show();
							}
						});// end of call users
					});// end of click event
				} //end of launch function

}; // end of login object
$('document').ready(login.launch);

// use below for reference validation needed above

	// //function tells user if inputs are empty
	// if 	((userPermission === undefined) || 
	// 	(username === "") || (password === "")){
	// 	$("#alert").show();
	// }
	// //function will send user to leader.html if their account info matches stored object
	// else if (userPermission === "manager") {
	// 	database.ref().once('value').then(function(snapshot) {
	// 	 	snapshot.forEach(function(childSnapshot) {
	// 	 		if ((username === childSnapshot.child("username").val()) && 
	// 	 			(password === childSnapshot.child("password").val()) &&
	// 	 			(userPermission === childSnapshot.child("userPermission").val()))
	// 	 			{
	// 	 			leader.teamLdr = username;		 				
	// 	 			window.location.href = "leader.html";
	// 	 			return true;
	// 	 		}//end of if
	// 	 		else {
	// 	 			$("#alert").show();
	// 	 		}//end of else	 		
	// 	 	});//end of iterationfunction
	// 	});// end of call function
	// }// end of else if
	// //function will send user to leader.html if their account info matches stored object
	// else if (userPermission === "tech") {
	// 	 database.ref().once('value').then(function(snapshot) {
	// 	 	snapshot.forEach(function(childSnapshot) {
	// 	 		if 	(username === childSnapshot.child("username").val()) &&
	// 	 		 	(password === childSnapshot.child("password").val()) &&
	// 	 		 	(userPermission === childSnapshot.child("userPermission").val())
	// 	 		 	{
		 		
	// 	 			window.location.href = "team.html";
	// 	 			return true
	// 	 		}// end of nested if 
	// 	 		else {
	// 	 			$("#alert").show();
	// 	 		}// end of else
	// 	 	});// end of data iteration function
	// 	});// end of database call function
	// } // end of else if

// });// end of click event


