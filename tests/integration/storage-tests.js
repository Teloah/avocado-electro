const chai = require('chai'),
    Storage = require('../../app/scripts/storage.js');
chai.should();

describe('Storage', function () {
    beforeEach(function () {
        this.storage = new Storage();
    });

    it('can set config path', function () {
        this.storage.setConfigPath('the/path');
        var path = this.storage.getConfigPath();
        path.should.equal('the/path');
    });
});