import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'path';
import process from 'process';
import { spawn } from 'child_process';

import { saveData } from './utils/saveData';
import { deleteSaveData } from './utils/deleteSaveData';
import { loadData } from './utils/loadData';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow: BrowserWindow = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  ipcMain.on('start-game', (_, userId: string) => {
    const gamePath = path.join(process.cwd(), 'game', 'Game.exe');

    const gameProcess = spawn(gamePath);

    gameProcess.on('close', () => {
      try {
        saveData(userId);
      } catch (err) {
        console.log('Could not save data:', err);
      }

      mainWindow.show();
    });

    mainWindow.hide();
    // shell.openExternal(gamePath);
    // app.quit();
  });

  ipcMain.on('load-game', (_, userId: string) => {
    loadData(userId);
  });

  ipcMain.on('delete-save', () => {
    deleteSaveData();
  });
});

app.on('before-quit', () => {
  deleteSaveData();
});
