const electron = require('electron'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow,
  Storage = require('./scripts/storage.js');

require("electron-reload")(__dirname);

let mainWindow;
let storage = new Storage();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000, height: 600,
    minHeight: 200, minWidth: 300,
    icon: './resources/avocado.png'
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  var argv = require('yargs').argv;
  console.log(argv);
  storage.setPath(argv.config);
  console.log(storage.load());
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  app.quit();
});