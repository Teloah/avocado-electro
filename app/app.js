const electron = require('electron'),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow,
  Storage = require('./scripts/storage.js');

const {ipcMain} = require('electron');

require("electron-reload")(__dirname);

let mainWindow;
let storage = new Storage();

ipcMain.on('load-reports', (event, arg) => {
  var data = storage.loadReports();
  data.reports.forEach(report => {
    console.log(report);
  });
  event.sender.send('reports-loaded', data.reports);
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000, height: 600,
    minHeight: 200, minWidth: 300,
    icon: './app/resources/avocado.png'
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  var argv = require('yargs').argv;
  console.log(argv);
  if (argv.config) {
    storage.setConfigPath(argv.config);
  } else {
    storage.setConfigPath('./app/db');
  };
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});