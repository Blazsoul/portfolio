function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getCoors(cellId) {
    var rowIdx = cellId.indexOf('-');
    var colIdx = cellId.lastIndexOf('-');

    var coorI = +cellId.substring(rowIdx + 1, colIdx);
    var coorJ = +cellId.substring(colIdx + 1);
    var coors = [coorI, coorJ];

    return coors;
}