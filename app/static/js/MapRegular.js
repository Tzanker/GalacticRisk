import "./bootstrap.js";
class palleteMode {
    constructor(color, mode) {
        this.color = color;
        this.mode = mode;
    }
}

var currPMode = new palleteMode('#8B4513', 'system');
var selection = {
    count: 0, system: null,
};


var line, isDown;
$('map').load("/static/Map1.html");






$(document).ready(function (e) {
    var cw = $('color').width();
        $('color').css({'height': cw + 'px'});
    var cw = $('system').width();
        $('system').css({'height': cw + 'px'});
    $(window).on('resize', function (e) {
        var cw = $('color').width();
        $('color').css({'height': cw + 'px'});
        var cw = $('system').width();
        $('system').css({'height': cw + 'px'});
    });
});



