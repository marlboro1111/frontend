const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openFirefox: (url) => ipcRenderer.send('open-firefox', url),
  onStatus: (callback) => ipcRenderer.on('firefox-status', (event, message) => callback(message)),
});
