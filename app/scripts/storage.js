const fs = require('fs');

class Storage {
    constructor(dataPath) {
        this.configPath = dataPath;
    }
    getConfigPath() {
        return this.configPath;
    }
    setConfigPath(path) {
        this.configPath = path;
    }
    loadEntries() {
        const entries = fs.readFileSync(this.configPath + '/entries.json');
        return JSON.parse(entries).entries;
    }
    loadCompanies() {
        const companies = fs.readFileSync(this.configPath + '/companies.json');
        return JSON.parse(companies).companies;
    }
    loadTemplates() {
        const templates_json = fs.readFileSync(this.configPath + '/templates.json');
        const templates = JSON.parse(templates_json).templates;
        let result = new Map();
        templates.forEach(template => {
            result.set(template.name, template);
        });
        return result;
    }
    loadReports() {
        const reports_json = fs.readFileSync(this.configPath + '/reports.json');
        const reports = JSON.parse(reports_json).reports;
        let result = new Map();
        reports.forEach(report => {
            let arr = result.get(report.company);
            if (arr === undefined) {
                arr = [];
                result.set(report.company, arr);
            }
            arr.push(report.template);
        });
        return result;
    }
    getTemplatesFor(company) {
        let result = new Set();
        const reports = this.loadReports().get(company);
        if (reports) {
            const templates = this.loadTemplates();
            reports.forEach(report => {
                result.add(templates.get(report));
            });
        }
        return result;
    }
}

module.exports = Storage;