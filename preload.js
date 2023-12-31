const { ipcRenderer } = require('electron')


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  window.receivePyVersion((data) => {
    const element = document.getElementById("py-version")
    element.innerText = data
  });
})


window.receivePyVersion = function(callback) {
  ipcRenderer.on('py-version', (event, data) => {
    callback(data)
  })
}

