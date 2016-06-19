var Application = require('spectron').Application;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var path = require('path');

var appPath = path.resolve(__dirname, '../');
var electronPath = path.resolve(__dirname, '../node_modules/.bin/electron');

chai.should();
chai.use(chaiAsPromised);

describe('application launch', function () {
  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [appPath]
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

  it('shows no reports for empty config', function() {
    return this.app.client.waitUntilWindowLoaded()
      .click('#home')
      .getText('.no-data-yet').should.eventually.equal('No reports for this month');
  });

  it('shows no templates for empty config', function() {
    return this.app.client.waitUntilWindowLoaded()
      .click('#templates')
      .getText('.no-data-yet').should.eventually.equal('No templates yet');
  });

  it('shows no companies for empty config', function() {
    return this.app.client.waitUntilWindowLoaded()
      .click('#companies')
      .getText('.no-data-yet').should.eventually.equal('No companies yet');
  });

});
