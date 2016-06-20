var fs = require("fs");

function selectPage(id) {
	$(".nav-btn").removeClass("selected");
	var source = fs.readFileSync(__dirname + '/pages/' + id + '.html', "utf-8");
	$("#main").html(source);
	$("#top-bar").html('<p>' + id.charAt(0).toUpperCase() + id.slice(1) + '</p>');
	$("#" + id).addClass("selected");
}

$('.nav-btn').on('click', function() {
	selectPage(this.id);
});

$(document).ready(function(){
	selectPage("home");
});