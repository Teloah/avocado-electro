const fs = require('fs');

let Storage = function () {
    this.configPath = './data';
};

Storage.prototype.getConfigPath = function () {
    return this.configPath;
};

Storage.prototype.setConfigPath = function (path) {
    this.configPath = path;
};

Storage.prototype.loadEntries = function () {
    const entries = fs.readFileSync(this.configPath + '/entries.json');
    return JSON.parse(entries).entries;
};

Storage.prototype.loadCompanies = function () {
    const companies = fs.readFileSync(this.configPath + '/companies.json');
    return JSON.parse(companies).companies;
};

Storage.prototype.loadTemplates = function () {
    const templates_json = fs.readFileSync(this.configPath + '/templates.json');
    const templates = JSON.parse(templates_json).templates;
    let result = new Map();
    templates.forEach(template => {
        result.set(template.name, template);
    });
    return result;
};

Storage.prototype.loadReports = function () {
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
};

module.exports = Storage;