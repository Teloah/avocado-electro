'use strict';

var Storage = function () {
    this.configPath = './data';
};

Storage.prototype.getConfigPath = function () {
    return this.configPath;
};

Storage.prototype.setConfigPath = function (path) {
    this.configPath = path;
};

module.exports = Storage;