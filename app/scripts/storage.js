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
    let entries = fs.readFileSync(this.configPath + '/entries.json');
    return JSON.parse(entries);
};

Storage.prototype.loadCompanies = function () {
    let companies = fs.readFileSync(this.configPath + '/companies.json');
    return JSON.parse(companies);
};

Storage.prototype.loadTemplates = function () {
    let templates = fs.readFileSync(this.configPath + '/templates.json');
    return JSON.parse(templates);
};

Storage.prototype.loadReports = function () {
    let reports = fs.readFileSync(this.configPath + '/reports.json');
    return JSON.parse(reports);
};

module.exports = Storage;