const chai = require('chai'),
    Storage = require('../../app/scripts/storage.js');
chai.should();

describe('tesing storage', function () {
    beforeEach(function () {
        this.storage = new Storage();
    })

    it('can set config file', function () {
        this.storage.setPath('the/path');
        var path = this.storage.load();
        path.should.equal('path:[the/path]');
    })
})