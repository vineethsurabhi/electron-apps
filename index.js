const electron = require("electron");
const {autoUpdater} = require("electron-updater");
const {ipcMain} = require("electron");

const path = require("path");
const url = require("url");

const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
    	mainWindow = new BrowserWindow({ width: 1200, height: 680, resize: true});
	mainWindow.once("focus", () => mainWindow.flashFrame(false));
	mainWindow.flashFrame(true);

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, "index.html"),
		protocol: "file:",
		slashes: true
	}));
};
app.on("ready", function() {
  createWindow();
  autoUpdater.checkForUpdates();
});
autoUpdater.on('update-downloaded', (info) => {
  mainWindow.webContents.send('updateReady')
});
ipcMain.on("quitAndInstall", (event, arg) => {
  autoUpdater.quitAndInstall();
});