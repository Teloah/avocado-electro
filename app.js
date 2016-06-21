const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

require("electron-reload")(__dirname);

let mainWindow;

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
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  app.quit();
});