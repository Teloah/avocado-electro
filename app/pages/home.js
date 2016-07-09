const {ipcRenderer} = require('electron');

ipcRenderer.on('reports-loaded', (event, reports) => {
	if (reports.length === 0) {
		return;
	}
	let table_html = '<table>';
	reports.forEach(report => {
		table_html += `<tr><td>${report.report}</td><td>${report.company}</td><td>${report.date}</td><td>${report.comment}</td></tr>`;
	});
	table_html += '</table>';
	$("#main").html(table_html);
});

class HomePresenter {
	loadReports() {
		ipcRenderer.send('load-reports', '');
	}
    show() {
        this.loadReports();
    }
}

module.exports = HomePresenter;