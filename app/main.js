const fs = require("fs");
const {ipcRenderer} = require('electron');

ipcRenderer.on('reports-loaded', (event, reports) => {
	console.log(reports);
	var table_html = '<table>';
	reports.forEach(report => {
		table_html += `<tr><td>${report.report}</td><td>${report.company}</td><td>${report.date}</td><td>${report.comment}</td></tr>`;
	});
	table_html += '</table>';
	$("#main").html(table_html);
});

function selectPage(id) {
	$(".nav-btn").removeClass("selected");
	var source = fs.readFileSync(__dirname + '/pages/' + id + '.html', "utf-8");
	$("#main").html(source);
	$("#top-bar").html('<p>' + id.charAt(0).toUpperCase() + id.slice(1) + '</p>');
	$("#" + id).addClass("selected");
}

$('.nav-btn').on('click', () => {
	selectPage(this.id);
});

$(document).ready(() => {
	selectPage("home");
	ipcRenderer.send('load-reports', '');
});