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