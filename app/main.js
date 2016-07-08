const fs = require("fs"),
	HomePresenter = require('./scripts/home.js');

const presenters = new Map();
presenters.set('home', new HomePresenter());

function selectPage(id) {
	console.log(`Switching to ${id}`);
	$(".nav-btn").removeClass("selected");
	let source = fs.readFileSync(__dirname + '/pages/' + id + '.html', "utf-8");
	$("#main").html(source);
	$("#top-bar").html('<p>' + id.charAt(0).toUpperCase() + id.slice(1) + '</p>');
	$("#" + id).addClass("selected");

	let presenter = presenters.get(id);
	if (presenter) {
		presenter.show();
	}
}

$('.nav-btn').on('click', function () {
	selectPage(this.id);
});

$(document).ready(() => {
	selectPage("home");
});