'use strict';

var Storage = function () {
    this.path = './data';
};

Storage.prototype.load = function () {
    return "path:[" + this.path + "]";
};

Storage.prototype.setPath = function (path) {
    this.path = path;
};

module.exports = new Storage();