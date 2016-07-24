class Report {
    constructor(storage) {
        this.storage = storage;
        this.companies = storage.loadCompanies();
        this.templates = storage.loadTemplates();
        this.reports = storage.loadReports();
    }
    parseEntries() {
        let entries = [];
        this.companies.forEach(company => {
            let templates = this.storage.getTemplatesFor(company);
            templates.forEach(template => {
                entries.push({ report: `${template.name}`, company: `${company}`, date: `201607${template.config}`, comment: `` });
            });
        });
        return entries;
    }
}

module.exports = Report;