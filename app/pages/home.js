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
    let table_html = `<div class="reports">`;
        table_html += `<div class="report_head">`;
        table_html += `<div class="report_date_header report_cell">Date</div>`;
        table_html += `<div class="report_name_header report_cell">Name</div>`;
        table_html += `<div class="report_company_header report_cell">Company</div>`;
        table_html += `<div class="report_comment_header report_cell">Comment</div>`;
        table_html += `</div>`;
    reports.forEach(report => {
        table_html += `<div class="report">`;
        table_html += `<div class="report_date report_cell">${report.date}</div>`;
        table_html += `<div class="report_name report_cell">${report.report}</div>`;
        table_html += `<div class="report_company report_cell">${report.company}</div>`;
        table_html += `<div class="report_comment report_cell">${report.comment}</div>`;
        table_html += `</div>`;
    });
    table_html += `</div>`;
    return table_html;
}

ipcRenderer.on('entries-loaded', (event, entries) => {
    if (entries.length === 0) {
        return;
    }
    let entries_html = formatReportsDOM(entries);
    $("#main").html(entries_html);
});

