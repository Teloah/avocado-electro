const chai = require('chai'),
    Report = require('../../app/scripts/reports.js');
chai.should();

describe('Report', function () {
    beforeEach(function () {
        this.report = new Report();
    });

    it('returns empty array for empty inputs', function () {
        let entries = this.report.parseEntries();
        entries.should.deep.equal([]);
    });
});