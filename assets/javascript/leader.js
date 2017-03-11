// on click id add-w-o 
// create button with class accordion
// append div with class panel
// append to panel id issuer.val ref.val date.val
// appen button to id w-o-list
var leader = {
	createWO: 	function() {
					$('#add-w-o').click(function() {
						var issuer = $('#issuer').val().trim();
						var date = $('#date').val().trim();
						var ref = $('#ref').val().trim();
						var task = $('#w-o-task').val().trim();
						var newBtn = $('<button class="accordion">' + 
									ref + '</button>');
						$('#w-o-list').append(newBtn);
						var newDiv = $('<div class="panel">');
						newDiv.val(ref);
						var newTag = $('<h3>Issuer: ' + issuer + '</h3>');
						newDiv.append(newTag);
						var newTag = $('<h3>Date: ' + date + '</h3>');
						newDiv.append(newTag);
						var newTag = $('<h3>Reference: ' + ref + '</h3>');
						newDiv.append(newTag);
						var newTag = $('<h3>task: ' +  + '</h3>');
						newDiv.append(newTag);
						$('#w-o-list').append(newDiv);
					});
	}
};