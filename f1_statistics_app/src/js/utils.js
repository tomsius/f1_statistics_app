export function addWatermark() {
    var canvas = document.getElementsByTagName("canvas")[0];
        
    if (canvas) {
        var context = canvas.getContext("2d");
        context.fillStyle = "grey";
        context.font = "10px verdana";
        var text = "Lenktynių rezultatų portalas";
        context.fillText(text, 0, canvas.height - 25);
    }
}

export function changeExportButtonsLanguage() {
    var container = document.getElementsByClassName("canvasjs-chart-toolbar")[0];

    if (container) {
        var toolbar = container.getElementsByTagName("div")[0];
        
        toolbar.children[0].textContent = "Atspausdinti";
        toolbar.children[1].textContent = "Atsisiųsti (JPEG)";
        toolbar.children[2].textContent = "Atsisiųsti (PNG)";
    }
}