const Application = require('spectron').Application,
  chai = require('chai'),
  chaiAsPromised = require('chai-as-promised'),
  path = require('path'),
  fs = require('fs');

const appPath = path.resolve(__dirname, '../'),
  electronPath = path.resolve(__dirname, '../node_modules/.bin/electron');

chai.should();
chai.use(chaiAsPromised);

describe('application launch', function () {
  beforeEach(function () {
    fs.writeFileSync(`${appPath}/tests/db/reports.json`, '{"reports":[]}');
    this.app = new Application({
      path: electronPath,
      args: [appPath, '--config=./tests/db']
    });
    return this.app.start();
  });

  beforeEach(function () {
    chaiAsPromised.transferPromiseness = this.app.transferPromiseness;
  });

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('opens a window', function () {
    return this.app.client.waitUntilWindowLoaded()
      .getWindowCount().should.eventually.equal(1)
      .browserWindow.isMinimized().should.eventually.be.false
      .browserWindow.isDevToolsOpened().should.eventually.be.false
      .browserWindow.isVisible().should.eventually.be.true
      .browserWindow.isFocused().should.eventually.be.true
      .browserWindow.getBounds().should.eventually.have.property('width').and.be.above(0)
      .browserWindow.getBounds().should.eventually.have.property('height').and.be.above(0);
  });

  it('shows no reports for empty config', function () {
    return this.app.client.waitUntilWindowLoaded()
      .click('#home')
      .getText('.no-data-yet').should.eventually.equal('No reports for this month');
  });

  it('shows no templates for empty config', function () {
    return this.app.client.waitUntilWindowLoaded()
      .click('#templates')
      .getText('.no-data-yet').should.eventually.equal('No templates yet');
  });

  it('shows no companies for empty config', function () {
    return this.app.client.waitUntilWindowLoaded()
      .click('#companies')
      .getText('.no-data-yet').should.eventually.equal('No companies yet');
  });

  it('shows a single report', function () {
    let data = '{"reports":[{"report":"VSA","company":"TestCompany","date":"20161231","comment":"Comment"}]}';
    fs.writeFileSync('./tests/db/reports.json', data);

    return this.app.client.waitUntilWindowLoaded()
      .click('#companies')
      .click('#home')
      .getText('.report_date').should.eventually.equal('20161231')
      .getText('.report_name').should.eventually.equal('VSA')
      .getText('.report_company').should.eventually.equal('TestCompany')
      .getText('.report_comment').should.eventually.equal('Comment');
  });

});
