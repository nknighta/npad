const { app, BrowserWindow } = require('electron');

function createWindow() {
    const mainWindow = new BrowserWindow({
        opacity: 0.9,
        width: 600,
        height: 900,
        autoHideMenuBar: true,
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#000',
            symbolColor: '#fff',
            showOnHover: true,
            height: 30
        }
    });

    // Load your HTML file or URL here
    mainWindow.loadFile('./view/index.html');

    // Other window configurations or event handlers can be added here

    // Don't forget to handle window close event
    mainWindow.on('closed', () => {
        app.quit();
    });
}

app.whenReady().then(createWindow);