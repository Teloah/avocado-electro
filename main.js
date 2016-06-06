var fs = require("fs");

$('.nav-btn').on('click', function() {
	var source = fs.readFileSync(__dirname + '/pages/' + this.id + '.html', "utf-8");
	document.getElementById("main").innerHTML  = source;
});