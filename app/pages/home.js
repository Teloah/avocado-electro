const {ipcRenderer} = require('electron');

ipcRenderer.on('reports-loaded', (event, reports) => {
	if (reports.length === 0) {
		return;
	}
	let table_html = '<table class="reports"><tr><th>Date</th><th>Name</th><th>Company</th><th>Comments</th></tr>';
	reports.forEach(report => {
		table_html += `<tr class="report">`;
		table_html += `<td class="report_date">${report.date}</td>`;
		table_html += `<td class="report_name">${report.report}</td>`;
		table_html += `<td class="report_company">${report.company}</td>`;
		table_html += `<td class="report_comment">${report.comment}</td>`;
		table_html += `</tr>`;
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