function replaceBetween(origin, startIndex, endIndex, insertion) {
    return origin.substring(0, startIndex) + insertion + origin.substring(endIndex);
}
export function stringToHTML(str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc;
};
var support = (function () {
    if (!window.DOMParser) return false;
    var parser = new DOMParser();
    try {
        parser.parseFromString('x', 'text/html');
    } catch(err) {
        return false;
    }
    return true;
})();

function getPixels(img,ctx,canvas)
{
    var currentPixels = null;
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
    currentPixels = ctx.getImageData(0, 0, img.width, img.height);
    img.onload = null;
    return currentPixels
}

function hexToRGB(hex)
{
    var long = parseInt(hex.replace(/^#/, ""), 16);
    return {
        R: (long >>> 16) & 0xff,
        G: (long >>> 8) & 0xff,
        B: long & 0xff
    };
}
export function changeColor(img, color)
{
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    let originalPixels = getPixels(img,ctx, canvas);
    let currentPixels = originalPixels;
    if(!originalPixels) return; // Check if image has loaded
    var newColor = hexToRGB(color);

    for(var I = 0, L = originalPixels.data.length; I < L; I += 4)
    {
        if(currentPixels.data[I + 3] > 0) // If it's not a transparent pixel
        {
            currentPixels.data[I] = originalPixels.data[I] / 255 * newColor.R;
            currentPixels.data[I + 1] = originalPixels.data[I + 1] / 255 * newColor.G;
            currentPixels.data[I + 2] = originalPixels.data[I + 2] / 255 * newColor.B;
        }
    }

    ctx.putImageData(currentPixels, 0, 0);
    return canvas.toDataURL("image/png");
}