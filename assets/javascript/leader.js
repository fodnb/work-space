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
// leader object
var leader = {
	database: firebase.database(),
	username: '',
	work: [],
	initiate: 	function() {

					leader.username = JSON.parse(localStorage.getItem('username'));
					// console.log(leader.username);
					var updates = {};
					updates['users/' + leader.username + '/status'] = 'online';
					leader.database.ref().update(updates);
					leader.database.ref('users/'+ leader.username).once('value', function(snap){
						//console.log(snap.val());
					});
					leader.createWO();
					leader.displayWO();
					leader.teamList();
					leader.newNumber();
	},//end initiate

	newNumber: function() {
					// creates a uniqueId using underscore.js
					leader.database.ref("lastReference").once("value", function(snap) {
						var howMany = snap.val().split(/\D/)
						howMany = howMany[howMany.length - 1]
						// console.log(howMany)
						howMany = parseInt(howMany)
						for (count = 0; count < howMany; count++) {
							_.uniqueId()
						};
					});
	},

	onDisconnect: function () {
					leader.username = JSON.parse(localStorage.getItem('username'));
					leader.database.ref('users/'+ leader.username + "/status").onDisconnect().set("offline")
	},//end onDisconnect

	teamList: 	function() {
					leader.database.ref('users').on("value", function(snap) {
						$("#team-list").empty();
						snap.forEach(function (childSnap) {
							if (childSnap.child("status").val() === "online" &&
								childSnap.child("role").val() === "team") {
								$("#team-list").append("<p>" + childSnap.child("name").val() + "</p>")
							}
						});
					});
	},

	createWO: 	function() {
					$('#add-w-o').click(function() {

						// create locations in the firebase for the list of work orders
						var woID = leader.database.ref('work/').push().key;
						
						// collect field inputs
						var issuer = $('#issuer').val().trim();
						var date = $('#date').val().trim();
						var ref = $('#ref').val().trim();
						var task = $('#w-o-task').val().trim();
						// create button for accordion
						var wOrder = [];

						// unscore reference number
						var ref = _.uniqueId(ref)
						leader.database.ref("/lastReference").set(ref);

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
            			// create object for storage
						var woObject = new Object();
						woObject.issuer = $('#issuer').val().trim();
						woObject.assign = $('#assigned').val().trim();
						woObject.date = $('#date').val().trim();

						woObject.ref = ref;
						woObject.task = $('#w-o-task').val().trim(); 
						woObject.comment = ['initiate'];
						woObject.key = woID;


						// console.log(woObject);
						// console.log(woID);
						// console.log(assnID);

						// update locations in fire base
						var updates = {};
						updates['work/' + woID] = woObject;
					
						leader.database.ref().update(updates);

						// clear fields
						$('#issuer').val('');
						$('#assigned').val('');
						$('#date').val('');
						// $('#ref').val('');
						$('#w-o-task').val('');
					});
	},// end createWO
	displayWO: 	function() {
					leader.database.ref('work/').on('value', function(snap){
						//console.log(snap.val());
						$('#w-o-list').empty();
						snap.forEach(function(child){
							//console.log(child.val());
						
							var issuer = child.val().issuer;
							var assigned = child.val().assign;
							var date = child.val().date;
							var ref = child.val().ref;
							var task = child.val().task;
							var key = child.val().key;
							// create button for accordion

							var newBtn = $('<div id="w-o-button" data-toggle="collapse" class="panel panel-default">' + 
									ref + '</div>');

							// assign href
							newBtn.attr('href', '#' + ref);
							// append button
							$('#w-o-list').append(newBtn);
							// create accordion panel

							var newDiv = $('<div class="panel-collapse collapse">'); // class = "panel panel-default"

							// assign id for href above
							newDiv.attr('id', ref);
							// firebase key value for reference
							newDiv.attr('key', key);
							// create table of information for work order

							var newTable = $('<table class="table">'); // class = "table"
							var newThead = $('<thead class="threadHover">');
							var newTbody = $('<tbody>');
							var newData = $('<tr><th><p id="titleHeader">Issuer: </p><p id="script"> ' + issuer + '</p></th></tr>');
							newThead.append(newData);
							var newData = $('<tr><th><p id="title">Assigned: </p><p id="script"> ' + assigned + '</p></th></tr>');
							newThead.append(newData);
							var newData = $('<tr><th><p id="title">Date: </p><p id="script"> ' + date + '</p></th></tr>');
							newThead.append(newData);
							var newData = $('<tr><th><p id="title">Reference: </p><p id="script"> ' + ref + '</p></th></tr>');
							newThead.append(newData);
							var newData = $('<tr><td><p id="title">Task: </p><p id="script"> ' + task + '</p></td></tr>');
							newTbody.append(newData);
							// assemble table
							newTable.append(newThead);
							newTable.append(newTbody);
							newDiv.append(newTable);
							// append panel 
							$('#w-o-list').append(newDiv);
						});// end of forEach
					});// end of on 
	},

	
};//end leader object
$('document').ready(function() {
	leader.initiate();
	leader.onDisconnect();
});	