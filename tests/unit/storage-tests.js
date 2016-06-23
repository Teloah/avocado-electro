const chai = require('chai');
chai.should();

describe('tesing storage', function () {
    beforeEach(function () {
        this.storage = require('../../app/scripts/storage.js');
    })

    it('can set config file', function () {
        this.storage.setPath('the/path');
        var path = this.storage.load();
        path.should.equal('path:[the/path]');
    })
})