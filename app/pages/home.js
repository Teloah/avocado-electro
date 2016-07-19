const {ipcRenderer} = require('electron');

class HomePresenter {
	loadReports() {
		ipcRenderer.send('load-entries', '');
	}
    show() {
        this.loadReports();
    }
}
module.exports = HomePresenter;

function formatReportsDOM(reports) {
	let table_html = `<table class="reports">
						<thead><tr><th>Date</th><th>Name</th><th>Company</th><th>Comments</th></tr></thead>
						<tbody>`;
	reports.forEach(report => {
		table_html += `<tr class="report">`;
		table_html += `<td class="report_date">${report.date}</td>`;
		table_html += `<td class="report_name">${report.report}</td>`;
		table_html += `<td class="report_company">${report.company}</td>`;
		table_html += `<td class="report_comment">${report.comment}</td>`;
		table_html += `</tr>`;
	});
	table_html += `</tbody></table>`;
	return table_html;
}

ipcRenderer.on('entries-loaded', (event, entries) => {
	if (entries.length === 0) {
		return;
	}
	let entries_html = formatReportsDOM(entries);
	$("#main").html(entries_html);
});

