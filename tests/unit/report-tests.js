const chai = require('chai'),
    Report = require('../../app/scripts/reports.js');
chai.should();

class StubStorage {
    constructor(companies, templates, reports) {
        this.companies = companies;
        this.templates = templates;
        this.reports = reports;
    }
    loadCompanies() {
        return this.companies;
    }
    loadTemplates() {
        return this.templates;
    }
    loadReports() {
        return this.reports;
    }
}

describe('Report', function () {
    it('returns empty array for empty inputs', function () {
        let storage = new StubStorage([], [], []);
        let report = new Report(storage);
        let entries = report.parseEntries();
        entries.should.deep.equal([]);
    });

    it('combines one company and template into an entry', function () {
        let templates = new Map();
        templates.set("VSA", { name: "VSA", type: "MONTHLY", config: "15" });
        let reports = new Map();
        reports.set("TestCompany", ["VSA"]);
        let storage = new StubStorage(["TestCompany"], templates, reports);
        let report = new Report(storage);
        let entries = report.parseEntries();
        entries.should.deep.equal([{ company: "TestCompany", report: "VSA", date: "20160715", comment: "" }]);
    });

    it('combines one company and several templates into entries', function () {
        let storage = new StubStorage(
            ["TestCompany"],
            new Map([
                ["Template1", { name: "Template1", type: "MONTHLY", config: "15" }],
                ["Template2", { name: "Template2", type: "MONTHLY", config: "20" }]
            ]),
            new Map([
                ["TestCompany", ["Template1", "Template2"]],
            ])
        );
        let report = new Report(storage);
        let entries = report.parseEntries();
        entries.should.deep.equal([
            { company: "TestCompany", report: "Template1", date: "20160715", comment: "" },
            { company: "TestCompany", report: "Template2", date: "20160720", comment: "" }]
        );
    });

    it('combines several companies with different templates into entries', function () {
        let storage = new StubStorage(
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
        let report = new Report(storage);
        let entries = report.parseEntries();
        entries.should.deep.equal([
            { company: "TestCompany", report: "Template1", date: "20160715", comment: "" },
            { company: "TestCompany2", report: "Template2", date: "20160720", comment: "" }]
        );
    });
});