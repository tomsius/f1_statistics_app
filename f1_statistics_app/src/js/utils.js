export function addWatermark() {
    var canvas = document.getElementsByTagName("canvas")[0];
        
    if (canvas) {
        var context = canvas.getContext("2d");
        context.fillStyle = "grey";
        context.font = "10px verdana";
        var text = "F-1 lenktynių rezultatų portalas";
        context.fillText(text, 0, canvas.height - 25);
    }
}

export function changeExportButtonsLanguage() {
    var container = document.getElementsByClassName("canvasjs-chart-toolbar")[0];

    if (container) {
        var toolbar = container.getElementsByTagName("div")[0];

        if (toolbar.children[0].textContent === "Print") {
            toolbar.removeChild(toolbar.childNodes[0]);
        }
        
        toolbar.children[0].textContent = "Atsisiųsti (JPEG)";
        toolbar.children[1].textContent = "Atsisiųsti (PNG)";
    }
}

export function getApi() {
    return process.env.REACT_APP_SERVER_URL;
}