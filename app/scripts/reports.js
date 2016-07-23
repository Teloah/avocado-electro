class Report {
    reportsFor(company, all_reports) {
        let reports = [];
        all_reports.forEach(report => {
            if (report.company === company) {
                reports.push(report);
            }
        });
        return reports;
    }
    parseEntries(companies, templates, reports) {
        let entries = [];
        companies.forEach(company => {
            let company_reports = this.reportsFor(company, reports);
            company_reports.forEach(report => {
                templates.forEach(template => {
                    if (template.name === report.template) {
                        entries.push({ report: `${report.template}`, company: `${company}`, date: `201607${template.config}`, comment: `` });
                    }
                });
            });
        });
        return entries;
    }
}

module.exports = Report;