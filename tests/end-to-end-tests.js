import test from 'ava';
import {Application} from 'spectron';
import path from 'path';

var appPath = path.resolve(__dirname, '../');
var electronPath = path.resolve(__dirname, '../node_modules/.bin/electron');

test.beforeEach(t => {
  t.context.app = new Application({
    path: electronPath,
    args: [appPath]
  });

  return t.context.app.start();
});

test.afterEach(t => {
  return t.context.app.stop();
});

test('can open the window', t => {
  return t.context.app.client.waitUntilWindowLoaded()
    .getWindowCount().then(count => {
      t.is(count, 1);
    }).browserWindow.isMinimized().then(min => {
      t.false(min);
    }).browserWindow.isDevToolsOpened().then(opened => {
      t.false(opened);
    }).browserWindow.isVisible().then(visible => {
      t.true(visible);
    }).browserWindow.isFocused().then(focused => {
      t.true(focused);
    }).browserWindow.getBounds().then(bounds => {
      t.true(bounds.width > 0);
      t.true(bounds.height > 0);
    });
});