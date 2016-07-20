const {app, BrowserWindow} = require('electron'),
  Storage = require('./scripts/storage.js'),
  Report = require('./scripts/reports.js');

const {ipcMain} = require('electron');

require("electron-reload")(__dirname);

let mainWindow;
let storage = new Storage();

function parseEntries(companies, templates, reports) {
  let report = new Report();
  return report.parseEntries(companies, templates, reports);
}

ipcMain.on('load-entries', (event) => {
  let data = storage.loadEntries();
  let companies = storage.loadCompanies();
  let templates = storage.loadTemplates();
  let reports = storage.loadReports();
  let entries = parseEntries(companies, templates, reports);
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

  let argv = require('yargs').argv;
  let configPath = argv.config ? argv.config : './app/db';
  storage.setConfigPath(configPath);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});