const windowtitle = document.getElementById('title');
windowtitle.innerHTML = "n pad";

const editorcontainer = document.getElementById('editor_container');

let innerWindowWidth = window.innerWidth;
let innerWindowHeight = window.innerWidth;

let edidorsizeW = window.innerWidth - 50;
let edidorsizeH = window.innerHeight - 50;

window.addEventListener("resize", () => {
    innerWindow = window.innerHeight;
});

let editorElement = document.createElement("textarea");
editorElement.setAttribute("placeholder", "begin typing here...");
editorElement.setAttribute("id", "main_editor");
//editorElement.style.width = `${edidorsizeW}px`;
editorElement.style.width = `100%`
editorElement.style.height = `${edidorsizeH}px`;
editorElement.style.resize = "none";
editorElement.style.border = "none";
editorElement.style.outline = "none";  
editorElement.style.padding = "10px"; 

function resizeWindow(){
    editorElement.style.width = `${edidorsizeW}px`;
    editorElement.style.height = `${edidorsizeH}px`;
}

editorcontainer.appendChild(editorElement);

window.addEventListener("resize", resizeWindow);
