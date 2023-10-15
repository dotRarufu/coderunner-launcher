import { app, BrowserWindow, ipcMain } from 'electron';
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
    width: 400,
    height: 600,
    resizable: false,
    icon: 'src/assets/icon.png',
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
  const inBuild = !MAIN_WINDOW_VITE_DEV_SERVER_URL;

  ipcMain.on('start-game', (_, userId: string) => {
    const devGamePath = path.join(process.cwd(), 'game', 'Game.exe');
    const buildGamePath = path.join(
      process.cwd(),
      'resources',
      'app',
      'game',
      'Game.exe'
    );

    const gameProcess = spawn(inBuild ? buildGamePath : devGamePath);

    gameProcess.on('close', () => {
      try {
        saveData(userId, inBuild);
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
    loadData(userId, inBuild);
  });

  ipcMain.on('delete-save', () => {
    deleteSaveData(inBuild);
  });

  ipcMain.on('close-app', () => {
    app.quit();
  });

  ipcMain.on('get-asset-path', (event, arg) => {
    const inputPath = arg as string[];
    const inBuild = !MAIN_WINDOW_VITE_DEV_SERVER_URL;
    const devGamePath = ['src', ...inputPath].join('/');
    const buildGamePath = path.join(
      process.cwd(),
      'resources',
      'app',
      'src',
      ...inputPath
    );

    event.returnValue = inBuild ? buildGamePath : devGamePath;
  });
});

app.on('before-quit', () => {
  deleteSaveData();
});
