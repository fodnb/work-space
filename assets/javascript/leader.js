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
					console.log(leader.username);
					var updates = {};
					updates['users/' + leader.username + '/status'] = 'online';
					leader.database.ref().update(updates);
					leader.database.ref('users/'+ leader.username).once('value', function(snap){
						console.log(snap.val());

					});

					leader.createWO();
					leader.displayWO();
	},

	createWO: 	function() {
					$('#add-w-o').click(function() {

						// create locations in the firebase for the list of work orders
						var woID = leader.database.ref('work/').push().key;
						
						// collect field inputs
						var woObject = new Object();
						woObject.issuer = $('#issuer').val().trim();
						woObject.assign = $('#assigned').val().trim();
						woObject.date = $('#date').val().trim();
						woObject.ref = $('#ref').val().trim();
						woObject.task = $('#w-o-task').val().trim();
						woObject.key = woID;

						// create the assignment location and push key values
						var assignments = leader.database.ref('users/' + woObject.assign + '/assignments');
						assignments.push({key: woID});
						
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
						$('#ref').val('');
						$('#w-o-task').val('');
					});
	},// end createWO
	displayWO: 	function() {
					leader.database.ref('work/').on('value', function(snap){
						console.log(snap.val());
						$('#w-o-list').empty();
						snap.forEach(function(child){
							console.log(child.val());
						
							var issuer = child.val().issuer;
							var assigned = child.val().assigned;
							var date = child.val().date;
							var ref = child.val().ref;
							var task = child.val().task;
							var key = child.val().key;
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
							$('#w-o-list').append(newDiv);
						});// end of forEach
					});// end of on 
	},

	
};//end leader object
$('document').ready(leader.initiate);

// reference
						