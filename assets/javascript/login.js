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
						// calls the users object from the database
						login.database.ref('users/'+ username +'/').once('value',function(snap){
							// console.log(snap.val().password);
							// console.log(password);
							// console.log(snap.val().role);
							// if password is good
							if(snap.val().password === password){
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

