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
    let table_html = `<div class="reports">
        <div class="report">
        <div class="report_date report_table_header">Date</div>
        <div class="report_name report_table_header">Name</div>
        <div class="report_company report_table_header">Company</div>
        <div class="report_comment report_table_header">Comments</div>
        </div>`;
    reports.forEach(report => {
        table_html += `<div class="report">`;
        table_html += `<div class="report_date">${report.date}</div>`;
        table_html += `<div class="report_name">${report.report}</div>`;
        table_html += `<div class="report_company">${report.company}</div>`;
        table_html += `<div class="report_comment">${report.comment}</div>`;
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

