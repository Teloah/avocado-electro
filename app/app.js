const {app, BrowserWindow} = require('electron'),
  Storage = require('./scripts/storage.js'),
  Report = require('./scripts/reports.js');

const {ipcMain} = require('electron');

require("electron-reload")(__dirname);

let mainWindow;

let argv = require('yargs').argv;
let storage = new Storage(argv.config ? argv.config : './app/db');

function loadEntries() {
  let report = new Report(storage);
  return report.parseEntries();
}

ipcMain.on('load-entries', (event) => {
  let data = storage.loadEntries();
  let entries = loadEntries();
  entries.forEach(entry => {
    data.push(entry);
  });
  event.sender.send('entries-loaded', data);
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

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});