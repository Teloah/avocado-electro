const fs = require("fs");
const {ipcRenderer} = require('electron');

ipcRenderer.on('reports-loaded', (event, reports) => {
	console.log(reports);
	let table_html = '<table>';
	reports.forEach(report => {
		table_html += `<tr><td>${report.report}</td><td>${report.company}</td><td>${report.date}</td><td>${report.comment}</td></tr>`;
	});
	table_html += '</table>';
	$("#main").html(table_html);
});

function loadReports() {
	ipcRenderer.send('load-reports', '');
}

function selectPage(id) {
	$(".nav-btn").removeClass("selected");
	let source = fs.readFileSync(__dirname + '/pages/' + id + '.html', "utf-8");
	$("#main").html(source);
	$("#top-bar").html('<p>' + id.charAt(0).toUpperCase() + id.slice(1) + '</p>');
	$("#" + id).addClass("selected");
	console.log(`Switching to ${id}`);
	if (id === 'home') {
		loadReports();
	}
}

$('.nav-btn').on('click', function () {
	selectPage(this.id);
});

$(document).ready(() => {
	selectPage("home");
	loadReports();
});