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
        let path = this.storage.getConfigPath();
        path.should.equal('the/path');
    });

    it('can load already saved report entries', function () {
        let data = '{"entries":[{"report":"VSA","company":"TestCompany","date":"20161231","comment":"Comment"}]}';
        fs.writeFileSync('./tests/db/entries.json', data);
        this.storage.setConfigPath('tests/db');

        let entries = this.storage.loadEntries();

        entries.should.deep.equal([{ report: "VSA", company: "TestCompany", date: "20161231", comment: "Comment" }]);
    });

    it('can load companies', function () {
        let data = '{"companies":["Company1", "Company2"]}';
        fs.writeFileSync('./tests/db/companies.json', data);
        this.storage.setConfigPath('tests/db');

        let companies = this.storage.loadCompanies();

        companies.should.deep.equal(["Company1", "Company2"]);
    });

    it('can load templates', function () {
        let data = `{"templates":[
            {"name":"VSA", "type":"MONTHLY", "config":"15"}
        ]}`;
        fs.writeFileSync('./tests/db/templates.json', data);
        this.storage.setConfigPath('tests/db');

        let templates = this.storage.loadTemplates();

        templates.should.deep.equal([{ name: "VSA", type: "MONTHLY", config: "15" }]);
    });

    it('can load reports', function () {
        let data = `{"reports":[{"company":"TestCompany", "template":"TEST"}]}`;
        fs.writeFileSync('./tests/db/reports.json', data);
        this.storage.setConfigPath('tests/db');

        let templates = this.storage.loadReports();

        templates.should.deep.equal([{ company: "TestCompany", template: "TEST" }]);
    });
});