var fs = require("fs");

function selectPage(id) {
	$(".nav-btn").removeClass("selected");
	var source = fs.readFileSync(__dirname + '/pages/' + id + '.html', "utf-8");
	document.getElementById("main").innerHTML  = source;
	$("#" + id).addClass("selected");
}

$('.nav-btn').on('click', function() {
	selectPage(this.id);
});

$(document).ready(function(){
    selectPage("home");
});