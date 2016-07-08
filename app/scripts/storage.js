'use strict';

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

Storage.prototype.loadReports = function() {
    let reports = fs.readFileSync(this.configPath + '/reports.json');
    return JSON.parse(reports);
};

module.exports = Storage;