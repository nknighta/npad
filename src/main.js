const { app, ipcMain, BrowserWindow, dialog } = require('electron')
const fs = require('fs')
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
        },
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    // Load your HTML file or URL here
    mainWindow.loadFile('view/index.html');

    // Other window configurations or event handlers can be added here

    // Don't forget to handle window close event
    mainWindow.on('closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
    app.on('activate', () => {
        // ウィンドウがすべて閉じられている場合は新しく開く
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
    // ipc renderer handle
    ipcMain.handle('file-save', async (event, data) => {
        // 場所とファイル名を選択
        const path = dialog.showSaveDialogSync(mainWindow, {
            buttonLabel: '保存',  // ボタンのラベル
            filters: [
                { name: 'Text', extensions: ['txt', 'text'] },
            ],
            properties: [
                'createDirectory',  // ディレクトリの作成を許可 (macOS)
            ]
        });

        // キャンセルで閉じた場合
        if (path === undefined) {
            return ({ status: undefined });
        }

        // ファイルの内容を返却
        try {
            fs.writeFileSync(path, data);

            return ({
                status: true,
                path: path
            });
        }
        catch (error) {
            return ({ status: false, message: error.message });
        }
    });
    //
    ipcMain.handle('file-open', async (event) => {
        // ファイルを選択
        const paths = dialog.showOpenDialogSync(mainWindow, {
            buttonLabel: '開く',  // 確認ボタンのラベル
            filters: [
                { name: 'Text', extensions: ['txt', 'text'] },
            ],
            properties: [
                'openFile',         // ファイルの選択を許可
                'createDirectory',  // ディレクトリの作成を許可 (macOS)
            ]
        });

        // キャンセルで閉じた場合
        if (paths === undefined) {
            return ({ status: undefined });
        }

        // ファイルの内容を返却
        try {
            const path = paths[0];
            const buff = fs.readFileSync(path);

            return ({
                status: true,
                path: path,
                text: buff.toString()
            });
        }
        catch (error) {
            return ({ status: false, message: error.message });
        }
    })
}


app.whenReady().then(createWindow);