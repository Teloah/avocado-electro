const chai = require('chai'),
    fs = require('fs'),
    Storage = require('../../app/scripts/storage.js');
chai.should();

describe('Storage', function () {

    it('can set config path', function () {
        this.storage = new Storage('the/path');
        let path = this.storage.getConfigPath();
        path.should.equal('the/path');
    });

    it('can load already saved report entries', function () {
        let data = '{"entries":[{"report":"VSA","company":"TestCompany","date":"20161231","comment":"Comment"}]}';
        fs.writeFileSync('./tests/db/entries.json', data);
        this.storage = new Storage('tests/db');

        let entries = this.storage.loadEntries();

        entries.should.deep.equal([{ report: "VSA", company: "TestCompany", date: "20161231", comment: "Comment" }]);
    });

    it('can load companies', function () {
        let data = '{"companies":["Company1", "Company2"]}';
        fs.writeFileSync('./tests/db/companies.json', data);
        this.storage = new Storage('tests/db');

        let companies = this.storage.loadCompanies();

        companies.should.deep.equal(["Company1", "Company2"]);
    });

    it('can load templates', function () {
        let data = `{"templates":[
            {"name":"VSA", "type":"MONTHLY", "config":"15"},
            {"name":"TST", "type":"MONTHLY", "config":"20"}
        ]}`;
        fs.writeFileSync('./tests/db/templates.json', data);
        this.storage = new Storage('tests/db');

        let templates = this.storage.loadTemplates();

        templates.get('VSA').should.deep.equal({ name: "VSA", type: "MONTHLY", config: "15" });
        templates.get('TST').should.deep.equal({ name: "TST", type: "MONTHLY", config: "20" });
    });

    it('can load reports', function () {
        let data = `{"reports":[
            {"company":"TestCompany", "template":"TEST"},
            {"company":"TestCompany2", "template":"VSA"},
            {"company":"TestCompany", "template":"VSA"}
            ]}`;
        fs.writeFileSync('./tests/db/reports.json', data);
        this.storage = new Storage('tests/db');

        let templates = this.storage.loadReports();

        templates.get('TestCompany').should.deep.equal(["TEST", "VSA"]);
        templates.get('TestCompany2').should.deep.equal(["VSA"]);
    });

    it('returns templates for the company', () => {
        let data = '{"companies":["Company1", "Company2"]}';
        fs.writeFileSync('./tests/db/companies.json', data);
        data = `{"reports":[
            {"company":"Company1", "template":"TEST"},
            {"company":"Company2", "template":"VSA"},
            {"company":"Company1", "template":"VSA"}
            ]}`;
        fs.writeFileSync('./tests/db/reports.json', data);
        data = `{"templates":[
            {"name":"VSA", "type":"MONTHLY", "config":"15"},
            {"name":"SOME", "type":"MONTHLY", "config":"10"},
            {"name":"TEST", "type":"MONTHLY", "config":"20"}
        ]}`;
        fs.writeFileSync('./tests/db/templates.json', data);

        const storage = new Storage('tests/db');

        let templates = storage.getTemplatesFor("Company1");

        templates.should.deep.equal(new Set(
            [{ name: "VSA", type: "MONTHLY", config: "15" },
                { name: "TST", type: "MONTHLY", config: "20" }])
        );
    });
});