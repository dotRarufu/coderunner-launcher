// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, shell } from 'electron';

const startGame = () => {
  console.log('1');
  ipcRenderer.send('start-game');
};

export const api = {
  startGame,
  shell: (path: string, options?: Electron.OpenExternalOptions) =>
    shell.openExternal(path, options),
};

contextBridge.exposeInMainWorld('api', api);
