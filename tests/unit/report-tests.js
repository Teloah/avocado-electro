const chai = require('chai'),
    Report = require('../../app/scripts/reports.js');
chai.should();

describe('Report', function () {
    beforeEach(function () {
        this.report = new Report();
    });

    it('returns empty array for empty inputs', function () {
        let entries = this.report.parseEntries([], [], []);
        entries.should.deep.equal([]);
    });

    it('combines one company and template into an entry', function () {
        let entries = this.report.parseEntries(
            ["TestCompany"],
            [{ name: "VSA", type: "MONTHLY", config: "15" }],
            [{ company: "TestCompany", template: "VSA" }]
        );
        entries.should.deep.equal([{ company: "TestCompany", report: "VSA", date: "20160715", comment: "" }]);
    });

    it('combines one company and several templates into entries', function () {
        let entries = this.report.parseEntries(
            ["TestCompany"],
            [{ name: "Template1", type: "MONTHLY", config: "15" },
                { name: "Template2", type: "MONTHLY", config: "20" }],
            [{ company: "TestCompany", template: "Template1" },
                { company: "TestCompany", template: "Template2" }]
        );
        entries.should.deep.equal([
            { company: "TestCompany", report: "Template1", date: "20160715", comment: "" },
            { company: "TestCompany", report: "Template2", date: "20160720", comment: "" }]
        );
    });
});