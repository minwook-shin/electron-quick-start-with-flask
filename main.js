const { app, BrowserWindow } = require('electron')
const axios = require('axios')
const path = require('node:path')

async function fetchPythonVersion() {
  const response = await axios.get('http://127.0.0.1/python-version')
  return response.data
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, './preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  // mainWindow.webContents.openDevTools()
  fetchPythonVersion().then(data => {
    mainWindow.webContents.send('py-version', data)
  })

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})