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
        let templates = new Map();
        templates.set("VSA", { name: "VSA", type: "MONTHLY", config: "15" });
        let reports = new Map();
        reports.set("TestCompany", ["VSA"]);
        let report = new Report(["TestCompany"], templates, reports);
        let entries = report.parseEntries();
        entries.should.deep.equal([{ company: "TestCompany", report: "VSA", date: "20160715", comment: "" }]);
    });

    it('combines one company and several templates into entries', function () {
        let report = new Report(
            ["TestCompany"],
            new Map([
                ["Template1", { name: "Template1", type: "MONTHLY", config: "15" }],
                ["Template2", { name: "Template2", type: "MONTHLY", config: "20" }]
            ]),
            new Map([
                ["TestCompany", ["Template1", "Template2"]],
            ])
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
            new Map([
                ["Template1", { name: "Template1", type: "MONTHLY", config: "15" }],
                ["Template2", { name: "Template2", type: "MONTHLY", config: "20" }]
            ]),
            new Map([
                ["TestCompany", ["Template1"]],
                ["TestCompany2", ["Template2"]]
            ])
        );
        let entries = report.parseEntries();
        entries.should.deep.equal([
            { company: "TestCompany", report: "Template1", date: "20160715", comment: "" },
            { company: "TestCompany2", report: "Template2", date: "20160720", comment: "" }]
        );
    });
});