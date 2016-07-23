class Report {
    constructor(companies, templates, reports) {
        this.companies = companies;
        this.reports = reports;
        this.templates = templates;
    }
    templateByName(name) {
        let result = {};
        this.templates.forEach(template => {
            if (template.name === name) {
                result = template;
            }
        });
        return result;
    }
    reportsFor(company) {
        let result = [];
        this.reports.forEach(report => {
            if (report.company === company) {
                result.push(report);
            }
        });
        return result;
    }
    parseEntries() {
        let entries = [];
        this.companies.forEach(company => {
            let company_reports = this.reportsFor(company);
            company_reports.forEach(report => {
                let template = this.templateByName(report.template);
                entries.push({ report: `${template.name}`, company: `${company}`, date: `201607${template.config}`, comment: `` });
            });
        });
        return entries;
    }
}

module.exports = Report;