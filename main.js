const electron = require('electron')
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
let win;

function createWindow(){
    win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegrationInWorker: true
        }
    })

    var template = [
        {},
        {
            label: "GRD",
            submenu: [
                {
                    label: 'Quit',
                    accelerator: 'CommandOrControl+Q',
                    click: function(){
                        app.quit()
                    }
                },
                {
                    label: "Help",
                    accelerator: 'CommandOrControl+H',
                    click: function () {
                        const options = {
                            type: 'info',
                            title: 'Information',
                            message: "1. Enter information.\n2. Save file.\n3. Enjoy!",
                        }
                          dialog.showMessageBox(options);
                    }
                }
            ]
        }
    ];

    var Menu = electron.Menu;
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // load index file
    win.loadURL(`file://${__dirname}/app/index.html`);

    // open developer console
    win.webContents.openDevTools();

    // when window is closed
    win.on('close', () => {
        win = null;
    })
}

app.on('ready', createWindow);

// quit
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
});

// For dialogs
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

ipc.on('open-dialog-for-info', function (event) {
  dialog.showErrorBox('An Error Message', 'Atleast Enter One field.')
})

ipc.on('save-dialog', function (event) {
  const options = {
    title: 'Save a Text File',
    filters: [
      { name: 'myText', extensions: ['txt'] }
    ]
  }
  dialog.showSaveDialog(options, function (filename) {
    event.sender.send('saved-file', filename)
  })
})
