//const { ipcRenderer, BrowserWindow, dialog } = require('electron');
const appversion = document.getElementById('appversion');
const json = require('../package.json');
appversion.innerHTML = " .ver: " + json.version;
const { BrowserWindow, ipcRenderer, dialog } = require('electron');
const fs = require('fs');
const windowtitle = document.getElementById('title');
windowtitle.innerHTML = "n pad";

const editorcontainer = document.getElementById('editor_container');

let editorElement = document.createElement("textarea");
editorElement.setAttribute("placeholder", "begin typing here...");
editorElement.setAttribute("id", "main_editor");
editorElement.style.resize = "none";
editorElement.style.border = "none";
editorElement.style.outline = "none";
editorElement.style.padding = "10px";
editorElement.style.backgroundColor = "#000"; // 大きさが分かりやすいように背景色を追加
editorcontainer.appendChild(editorElement);

function resizeWindow() {
  editorElement.style.width = `${window.innerWidth - 0}px`;
  editorElement.style.height = `${window.innerHeight - 100}px`;
}

window.addEventListener("resize", resizeWindow); // ウインドウがリサイズされたらresizeWindowを実行
window.addEventListener("load", resizeWindow); // 起動時にもresizeWindowを実行

document.querySelector('#btn-save').addEventListener('click', () => {
  // メインプロセスを呼び出し
  saveFile();
});
// btn-open
//openFileボタンが押されたとき（ファイル名取得まで）

document.querySelector('#btn-open').addEventListener('click', () => {
  // メインプロセスを呼び出し
  openFile();
});

//指定したファイルを読み込む

function openFile() {
  ipcRenderer.invoke('file-open')
    .then((data) => {
      // ファイルが無事に開けた
      editorElement.value = data.text;
    })
    .catch((err) => {
      alert(err);
    });
};

function saveFile() {
  ipcRenderer.invoke('file-save', main_editor.value)
    .then((data) => {
      // キャンセルで閉じた
      if (data.status === undefined) {
        return (false);
      }
      // 保存できなかった
      if (!data.status) {
        alert(`ファイルが開けませんでした\n${data.message}`);
        return (false);
      }

      // 保存できた
      const message = document.querySelector('#message');
      message.textContent = 'saved!';
      message.style.display = 'inline';
      editorcontainer.focus();
    })
    .catch((err) => {
      alert("fail!" + err);
    });
}