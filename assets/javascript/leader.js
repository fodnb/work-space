
var leader = {
	teamLdr: '',
	createWO: 	function() {
					$('#add-w-o').click(function() {
						// collect field inputs
						var issuer = $('#issuer').val().trim();
						var date = $('#date').val().trim();
						var ref = $('#ref').val().trim();
						var task = $('#w-o-task').val().trim();
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
						// create table of information for work order
						var newTable = $('<table>');
						var newThead = $('<thead>');
						var newTbody = $('<tbody>');
						var newData = $('<tr><th><h3>Issuer: ' + issuer + '</h3></th></tr>');
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
						// clear fields
						$('#issuer').val('');
						$('#date').val('');
						$('#ref').val('');
						$('#w-o-task').val('');
					});
	},// end createWO
	
};//end leader object
$('document').ready(function(){
	leader.createWO();
	leader.teamLdr = localStorage.getItem('username');
	console.log(leader.teamLdr);
});