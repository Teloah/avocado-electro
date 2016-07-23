const chai = require('chai'),
    Report = require('../../app/scripts/reports.js');
chai.should();

describe('Report', function () {
    it('returns empty array for empty inputs', function () {
        let report = new Report([], [], []);
        let entries = report.parseEntries();
        entries.should.deep.equal([]);
    });

    it('combines one company and template into an entry', function () {
        let report = new Report(
            ["TestCompany"],
            [{ name: "VSA", type: "MONTHLY", config: "15" }],
            [{ company: "TestCompany", template: "VSA" }]
        );
        let entries = report.parseEntries();
        entries.should.deep.equal([{ company: "TestCompany", report: "VSA", date: "20160715", comment: "" }]);
    });

    it('combines one company and several templates into entries', function () {
        let report = new Report(
            ["TestCompany"],
            [{ name: "Template1", type: "MONTHLY", config: "15" },
                { name: "Template2", type: "MONTHLY", config: "20" }],
            [{ company: "TestCompany", template: "Template1" },
                { company: "TestCompany", template: "Template2" }]
        );
        let entries = report.parseEntries();
        entries.should.deep.equal([
            { company: "TestCompany", report: "Template1", date: "20160715", comment: "" },
            { company: "TestCompany", report: "Template2", date: "20160720", comment: "" }]
        );
    });

    it('combines several companies with different templates into entries', function () {
        let report = new Report(
            ["TestCompany", 'TestCompany2'],
            [{ name: "Template1", type: "MONTHLY", config: "15" },
                { name: "Template2", type: "MONTHLY", config: "20" }],
            [{ company: "TestCompany", template: "Template1" },
                { company: "TestCompany2", template: "Template2" }]
        );
        let entries = report.parseEntries();
        entries.should.deep.equal([
            { company: "TestCompany", report: "Template1", date: "20160715", comment: "" },
            { company: "TestCompany2", report: "Template2", date: "20160720", comment: "" }]
        );
    });
});