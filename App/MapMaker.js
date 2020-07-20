import "../js/bootstrap.js";

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

function makeSystem(x, y, name, color) {
    var system = '<system style="width: 30px; height:30px;  position: absolute; left: ' + x + '%; top: ' + y + '%" >' +
        '<planet class = "my-auto mx-0 rounded-circle" style="background-color: ' + color + '; display: inline-block; width: 100%; height: 100%" >' +
        '</planet>' +
        name +
        '</system>';
    return system
}
function getPos(system1, system2){
    let sys1Pos;
    let sys2Pos;
    let flip=0;
    if(system1.offset().left < system2.offset().left){
        if(system1.offset().top < system2.offset().top){
            sys1Pos = [(system1.offset().left + system1.width()) * 100 / $(document).width(),(system1.offset().top + system1.height()) * 100 / $(document).height()];
            sys2Pos = [(system2.offset().left) * 100 / $(document).width(), (system2.offset().top) * 100 / $(document).height()];
        } else {
            sys1Pos = [(system1.offset().left + system1.width()) * 100 / $(document).width(),(system1.offset().top) * 100 / $(document).height()];
            sys2Pos = [(system2.offset().left) * 100 / $(document).width(), (system2.offset().top + system2.height()) * 100 / $(document).height()];
            flip=1;
        }
    } else  if(system1.offset().left > system2.offset().left) {
        if (system1.offset().top < system2.offset().top) {
            sys1Pos = [(system1.offset().left) * 100 / $(document).width(), (system1.offset().top + system1.height()) * 100 / $(document).height()];
            sys2Pos = [(system2.offset().left + system2.width()) * 100 / $(document).width(), (system2.offset().top) * 100 / $(document).height()];
            flip=1;
        } else {
            sys1Pos = [(system1.offset().left) * 100 / $(document).width(), (system1.offset().top) * 100 / $(document).height()];
            sys2Pos = [(system2.offset().left + system2.width()) * 100 / $(document).width(), (system2.offset().top + system2.height()) * 100 / $(document).height()];

        }
    }
    return [sys1Pos, sys2Pos, flip];
}


function makePath(system1, system2, color){
        let positions = getPos(system1,system2);
        let sys1Pos = positions[0];
        let sys2Pos = positions[1];
        if(positions[2]){
            var path = ' <svg style="height:' + Math.abs(sys1Pos[1] - sys2Pos[1]) +  '%;' +
                ' width:' + Math.abs(sys1Pos[0] - sys2Pos[0]) +  '%;' +
                'position: absolute;' +
                'left: ' +Math.min( sys1Pos[0], sys2Pos[0])+ '%;' +
                'top: ' +Math.min( sys1Pos[1], sys2Pos[1])+ '%;" >\n' +
                '  <line x1="0%" y1="100%" x2="100%" y2="0%" style="stroke:'+color+';stroke-width:4px" />\n' +
                '</svg> '
        }else {
            var path = ' <svg style="height:' + Math.abs(sys1Pos[1] - sys2Pos[1]) + '%;' +
                ' width:' + Math.abs(sys1Pos[0] - sys2Pos[0]) + '%;' +
                'position: absolute;' +
                'left: ' + Math.min(sys1Pos[0], sys2Pos[0]) + '%;' +
                'top: ' + Math.min(sys1Pos[1], sys2Pos[1]) + '%;" >\n' +
                '  <line x1="0%" y1="0%" x2="100%" y2="100%" style="stroke:' + color + ';stroke-width:4px" />\n' +
                '</svg> '
        }
    return path
}

var line, isDown;
var cw = $('color').width();
$('color').css({'height': cw + 'px'});

$(document).ready(function (e) {


    $("map").on("click", function (e) {
        if (currPMode.mode == "system") {

            if (e.target == this) {
                let name = prompt("fill in System name");

                let xPosCent = (e.pageX - $(this).offset().left) * 100 / $(document).width();
                let yPosCent = (e.pageY - $(this).offset().top) * 100 / $(document).height();
                if (name) {
                    $(this).append(makeSystem(xPosCent, yPosCent, name, currPMode.color));
                }
            }
        }
    });
    $("map").on("click", "system", function (e) {
        if (currPMode.mode == "system") {
            $(this).remove();
        } else if (currPMode.mode == "path") {
            if (!selection.count) {
                $(this).css({"outline": "thick solid #0000FF"});
                selection.system=$(this);
                selection.count++;
            } else {
                $("map").append(makePath($(this),selection.system, currPMode.color));
                selection.system.css({"outline": ""});
                selection.system=null;
                selection.count=0;
            }
        }
    });
    $("map").on("click", "line", function (e) {
        if (currPMode.mode == "path") {
            $(this).remove();
        }
    });

    $("color").click(function (e) {
        currPMode.color = $(this).css("background-color");
        currPMode.mode = "system";
    });
    $("lineMode").click(function (e) {
        currPMode.color = $(this).css("background-color");
        currPMode.mode = "path";
    });
});

