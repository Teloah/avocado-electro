class Report {
    parseEntries(companies, templates, reports) {
        let entries = [];
        companies.forEach(company => {
            reports.forEach(report => {
                entries.push({ report: `${report.template}`, company: `${company}`, date: `20160715`, comment: `` });
            });
        });
        return entries;
    }
}

module.exports = Report;