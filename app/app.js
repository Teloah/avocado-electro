const {app, BrowserWindow} = require('electron'),
  Storage = require('./scripts/storage.js');

const {ipcMain} = require('electron');

require("electron-reload")(__dirname);

let mainWindow;
let storage = new Storage();

ipcMain.on('load-entries', (event) => {
  let data = storage.loadEntries();
  event.sender.send('entries-loaded', data.entries);
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