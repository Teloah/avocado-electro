class Report {
    constructor(storage) {
        this.companies = storage.loadCompanies();
        this.templates = storage.loadTemplates();
        this.reports = storage.loadReports();
    }
    parseEntries() {
        let entries = [];
        this.companies.forEach(company => {
            let company_reports = this.reports.get(company);
            company_reports.forEach(report => {
                let template = this.templates.get(report);
                entries.push({ report: `${template.name}`, company: `${company}`, date: `201607${template.config}`, comment: `` });
            });
        });
        return entries;
    }
}

module.exports = Report;