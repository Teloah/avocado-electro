const chai = require('chai'),
    fs = require('fs'),
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

    it('can load reports', function () {
        var data = '{"reports":[{"report":"VSA","company":"TestCompany","date":"20161231","comment":"Comment"}]}';
        fs.writeFileSync('./tests/db/reports.json', data);
        this.storage.setConfigPath('tests/db');

        var reports = this.storage.loadReports();

        reports.should.deep.equal({
            reports: [
                {
                    report: "VSA",
                    company: "TestCompany",
                    date: "20161231",
                    comment: "Comment"
                }
            ]
        });
    });
});