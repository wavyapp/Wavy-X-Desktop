// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');

const { NODE_ENV } = process.env;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
      allowDisplayingInsecureContent: true,
    },
    title: 'Wavy X',
    transparent: true,
    width: 1024,
    height: 768,
    center: true,
    enableLargerThanScreen: false,
    resizable: true,
    frame: true,
    titleBarStyle: 'hidden',
  });

  console.log({ NODE_ENV });
  // and load the index.html of the app.
  if (NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:9000/');
  } else {
    mainWindow.loadURL('https://app.wavy.fr');
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
