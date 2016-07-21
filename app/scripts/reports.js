class Report {
    parseEntries(companies, templates, reports) {
        let entries = [];
        companies.forEach(company => {
            reports.forEach(report => {
                templates.forEach(template => {
                    if (template.name === report.template) {
                        entries.push({ report: `${report.template}`, company: `${company}`, date: `201607${template.config}`, comment: `` });
                    };
                });
            });
        });
        return entries;
    }
}

module.exports = Report;