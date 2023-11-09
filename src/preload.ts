// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, shell } from 'electron';

const startGame = (userId: string) => {
  ipcRenderer.send('start-game', userId);
};

const loadGame = (userId: string) => {
  ipcRenderer.send('load-game', userId);
};

const deleteSave = () => {
  ipcRenderer.send('delete-save');
};

const closeApp = () => {
  ipcRenderer.send('close-app');
};

const getAssetPath = (path: string[]) => {
  return ipcRenderer.sendSync('get-asset-path', path);
};

export const api = {
  loadGame,
  startGame,
  deleteSave,
  closeApp,
  getAssetPath,
  shell: (path: string, options?: Electron.OpenExternalOptions) =>
    shell.openExternal(path, options),
};

contextBridge.exposeInMainWorld('api', api);
