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
}

$("#loginButton").on("click", function () {

loadNav();

});