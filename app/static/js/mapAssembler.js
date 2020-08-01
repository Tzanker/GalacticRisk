import { getMap, saveMap } from './Fetch.js'
import { stringToHTML } from  './Utils.js'
let network = null;
let nodes = [];
let edges = [];

window.addEventListener("load", () => {
    dialogInit()
    assembleMap();
});


async function assembleMap() {
    let index;
    let system
    let systemHTML = '<svg class="system_svg"  height="512" width="512" xmlns="http://www.w3.org/2000/svg"><circle cx="436" cy="136" fill="#eaaacb" r="20"/><circle cx="40" cy="66" fill="#cecdf3" r="30"/><circle cx="472" cy="446" fill="#cecdf3" r="30"/><circle cx="96" cy="276" fill="#fff2a0" r="20"/><circle cx="176" cy="456" fill="#99ebfa" r="20"/><circle cx="256" cy="256" fill="#e6e6f9" r="100"/><g fill="#cecdf3"><circle cx="276" cy="216" r="20"/><circle cx="246" cy="186" r="10"/><path d="M196 286c-12.396 0-23.034 7.519-27.607 18.245 9.132 16.548 22.815 30.23 39.363 39.363C218.481 339.034 226 328.396 226 316c0-16.569-13.432-30-30-30z"/></g><g fill="#000"><path d="M461.255 152.16C464.253 147.492 466 141.948 466 136c0-16.542-13.458-30-30-30-1.794 0-3.549.167-5.258.471C386.917 55.278 323.504 26 256 26c-61.435 0-119.193 23.924-162.634 67.366C49.924 136.807 26 194.565 26 256c0 84.602 45.914 161.686 120.08 202.079C147.153 473.654 160.158 486 176 486c7.781 0 14.879-2.979 20.216-7.855C215.624 483.354 235.72 486 256 486c61.435 0 119.193-23.924 162.634-67.366C462.076 375.193 486 317.435 486 256c0-36.083-8.552-71.857-24.745-103.84zM446 136c0 5.514-4.486 10-10 10s-10-4.486-10-10 4.486-10 10-10 10 4.486 10 10zM176 466c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm80 0c-17.023 0-33.898-2.034-50.268-6.053.171-1.293.268-2.608.268-3.947 0-16.542-13.458-30-30-30-9.947 0-18.774 4.87-24.235 12.347C86.326 400.917 46 331.759 46 256c0-115.794 94.206-210 210-210 60.382 0 117.181 25.662 157.092 70.659C408.672 121.886 406 128.635 406 136c0 16.542 13.458 30 30 30 3.167 0 6.219-.497 9.087-1.411C458.778 192.908 466 224.318 466 256c0 115.794-94.206 210-210 210z"/><path d="M256 86c-45.039 0-87.481 17.436-119.509 49.097-30.518 30.168-48.223 69.933-50.278 112.551C74.464 251.715 66 262.884 66 276c0 15.682 12.097 28.584 27.448 29.884C115.196 376.879 181.256 426 256 426c93.738 0 170-76.262 170-170S349.738 86 256 86zM86 276c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10-10-4.486-10-10zm170 130c-65.671 0-123.746-42.966-143.184-105.169C120.766 295.43 126 286.315 126 276c0-12.952-8.251-24.011-19.771-28.202 2.001-37.288 17.593-72.054 44.323-98.477C178.811 121.385 216.26 106 256 106c82.71 0 150 67.29 150 150s-67.29 150-150 150zM80 66c0-22.056-17.944-40-40-40S0 43.944 0 66s17.944 40 40 40 40-17.944 40-40zm-60 0c0-11.028 8.972-20 20-20s20 8.972 20 20-8.972 20-20 20-20-8.972-20-20zM472 406c-22.056 0-40 17.944-40 40s17.944 40 40 40 40-17.944 40-40-17.944-40-40-40zm0 60c-11.028 0-20-8.972-20-20s8.972-20 20-20 20 8.972 20 20-8.972 20-20 20z"/><path d="M366 256c0-60.654-49.346-110-110-110-53.043 0-97.436 37.738-107.743 87.774-.038.165-.069.332-.098.501C146.746 241.301 146 248.564 146 256c0 60.654 49.346 110 110 110 35.591 0 67.283-16.996 87.401-43.292.407-.449.774-.934 1.095-1.452 9.295-12.572 15.982-27.182 19.247-43.03.038-.165.069-.332.098-.5C365.254 270.699 366 263.435 366 256zm-200 0c0-3.38.194-6.715.559-10H226c5.523 0 10-4.477 10-10s-4.477-10-10-10h-54.852c12.383-34.92 45.741-60 84.852-60 49.626 0 90 40.374 90 90 0 3.38-.194 6.716-.559 10H286c-5.523 0-10 4.477-10 10s4.477 10 10 10h54.852c-2.524 7.118-5.917 13.829-10.056 20H266c-5.523 0-10 4.477-10 10s4.477 10 10 10h46.499c-15.457 12.5-35.117 20-56.499 20-49.626 0-90-40.374-90-90z"/></g></svg>';
    let map = await getMap();
    let title;
    nodes = [];
    edges = [];
    let path
    for (index in map.nodes) {
        system = map.nodes[index];
        systemHTML = '<svg class="system_svg" width="50px" height="50px" display="inline"  viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"> <circle cx="436" cy="136" fill="#eaaacb" r="20"/><circle cx="40" cy="66" fill="#cecdf3" r="30"/><circle cx="472" cy="446" fill="#cecdf3" r="30"/><circle cx="96" cy="276" fill="#fff2a0" r="20"/><circle cx="176" cy="456" fill="#99ebfa" r="20"/><circle cx="256" cy="256" fill="#e6e6f9" r="100"/><g fill="#cecdf3"><circle cx="276" cy="216" r="20"/><circle cx="246" cy="186" r="10"/><path d="M196 286c-12.396 0-23.034 7.519-27.607 18.245 9.132 16.548 22.815 30.23 39.363 39.363C218.481 339.034 226 328.396 226 316c0-16.569-13.432-30-30-30z"/></g><g id="system-outline-color" fill="' + system.color+ '"><path d="M461.255 152.16C464.253 147.492 466 141.948 466 136c0-16.542-13.458-30-30-30-1.794 0-3.549.167-5.258.471C386.917 55.278 323.504 26 256 26c-61.435 0-119.193 23.924-162.634 67.366C49.924 136.807 26 194.565 26 256c0 84.602 45.914 161.686 120.08 202.079C147.153 473.654 160.158 486 176 486c7.781 0 14.879-2.979 20.216-7.855C215.624 483.354 235.72 486 256 486c61.435 0 119.193-23.924 162.634-67.366C462.076 375.193 486 317.435 486 256c0-36.083-8.552-71.857-24.745-103.84zM446 136c0 5.514-4.486 10-10 10s-10-4.486-10-10 4.486-10 10-10 10 4.486 10 10zM176 466c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm80 0c-17.023 0-33.898-2.034-50.268-6.053.171-1.293.268-2.608.268-3.947 0-16.542-13.458-30-30-30-9.947 0-18.774 4.87-24.235 12.347C86.326 400.917 46 331.759 46 256c0-115.794 94.206-210 210-210 60.382 0 117.181 25.662 157.092 70.659C408.672 121.886 406 128.635 406 136c0 16.542 13.458 30 30 30 3.167 0 6.219-.497 9.087-1.411C458.778 192.908 466 224.318 466 256c0 115.794-94.206 210-210 210z"/><path d="M256 86c-45.039 0-87.481 17.436-119.509 49.097-30.518 30.168-48.223 69.933-50.278 112.551C74.464 251.715 66 262.884 66 276c0 15.682 12.097 28.584 27.448 29.884C115.196 376.879 181.256 426 256 426c93.738 0 170-76.262 170-170S349.738 86 256 86zM86 276c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10-10-4.486-10-10zm170 130c-65.671 0-123.746-42.966-143.184-105.169C120.766 295.43 126 286.315 126 276c0-12.952-8.251-24.011-19.771-28.202 2.001-37.288 17.593-72.054 44.323-98.477C178.811 121.385 216.26 106 256 106c82.71 0 150 67.29 150 150s-67.29 150-150 150zM80 66c0-22.056-17.944-40-40-40S0 43.944 0 66s17.944 40 40 40 40-17.944 40-40zm-60 0c0-11.028 8.972-20 20-20s20 8.972 20 20-8.972 20-20 20-20-8.972-20-20zM472 406c-22.056 0-40 17.944-40 40s17.944 40 40 40 40-17.944 40-40-17.944-40-40-40zm0 60c-11.028 0-20-8.972-20-20s8.972-20 20-20 20 8.972 20 20-8.972 20-20 20z"/><path d="M366 256c0-60.654-49.346-110-110-110-53.043 0-97.436 37.738-107.743 87.774-.038.165-.069.332-.098.501C146.746 241.301 146 248.564 146 256c0 60.654 49.346 110 110 110 35.591 0 67.283-16.996 87.401-43.292.407-.449.774-.934 1.095-1.452 9.295-12.572 15.982-27.182 19.247-43.03.038-.165.069-.332.098-.5C365.254 270.699 366 263.435 366 256zm-200 0c0-3.38.194-6.715.559-10H226c5.523 0 10-4.477 10-10s-4.477-10-10-10h-54.852c12.383-34.92 45.741-60 84.852-60 49.626 0 90 40.374 90 90 0 3.38-.194 6.716-.559 10H286c-5.523 0-10 4.477-10 10s4.477 10 10 10h54.852c-2.524 7.118-5.917 13.829-10.056 20H266c-5.523 0-10 4.477-10 10s4.477 10 10 10h46.499c-15.457 12.5-35.117 20-56.499 20-49.626 0-90-40.374-90-90z"/></g></svg>';
        var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(systemHTML);
        title='' + system.name  + '<hr class="tooltip-hr"> Some more text' + ''
        nodes.push({ id: system.id, label: system.name,font:{color:'white'}, image: url,
                        title: title,shape: "image",
                        interaction: {
                            hover: true,
                            dragNodes: false// do not allow dragging nodes
                        },
                        physics: false, x: system.x, y:system.y});
    }
    for (index in map.edges){
        path = map.edges[index];
        edges.push({id:path.id, from: path.from, to: path.to});
    }
    var container = document.getElementById("map");
    var data = {
    nodes: nodes,
    edges: edges,
    };
    console.log(map)
    let options={interaction: {
                    hover: true,
                    dragNodes: false// do not allow dragging nodes
                    },
                    physics: false,
                    manipulation: {
                      addNode: function (data, callback) {
                        // filling in the popup DOM elements
                        console.log(data);
                        editNode(data, clearNodePopUp, callback);
                      },
                      editNode: function (data, callback) {
                        // filling in the popup DOM elements
                        console.log(data);

                        editNode(data, cancelNodeEdit, callback);
                      },
                      addEdge: function (data, callback) {
                      console.log(data);
                        if (data.from == data.to) {
                          var r = confirm("Do you want to connect the System to itself?");
                          if (r != true) {
                            callback(null);
                            return;
                          }
                        }
                        editEdgeWithoutDrag(data, callback);
                      },
                      editEdge: {
                        editWithoutDrag: function (data, callback) {
                          editEdgeWithoutDrag(data, callback);
                        },
                      },
                    }};
    network = new vis.Network(container, data, options);
}

$('main').prepend('<input type="button" id="saveButton" value="Save">')
document.getElementById('saveButton').addEventListener('click', ()=>{
    console.log({nodes:network.body.data.nodes._data, paths:network.body.data.edges._data});
    saveMap({nodes:network.body.data.nodes._data, paths:network.body.data.edges._data});
});



function dialogInit(){
    $( function() {
        $( "#dialog-system-edit" ).dialog({
            autoOpen: false, buttons: {
                OK: function() {
                    let data= $( this ).data("data");
                    let callback= $( this ).data("callback");
                    data.image = changeSystemColor($('input[name="colors"]:checked')[0].getAttribute('id'), data.image);
                    data.label = $('#system-edit-label').val();
                    console.log(data);
                    saveNodeData(data, callback)
                    $( this ).dialog( "close" );
                }
            },
            beforeClose: function( event, ui ) {

            },});
    } );
}


function editNode(data, cancelAction, callback) {
    systemEditPopup(data, callback);
}


// Callback passed as parameter is ignored
function systemEditPopup(data, callback){
    $('#dialog-system-edit').empty();
    let colors = ['#0D6EFD', 'darkgreen', 'red', 'saddlebrown', 'greenyellow', 'orange',
        'grey', 'darkred', 'deeppink', 'pink', 'lightgoldenrodyellow', 'white'];
    let colorRadio = ''
    for (let index in colors){

        colorRadio+= '  <label class="btn btn-circle color-select-container mb-1" style="background-color: '+ colors[index] +'">\n' +
            '    <input type="radio" name="colors" id="'+ colors[index] +'" autocomplete="off" checked>\n' +
            '  </label>'
    }
    $( "#dialog-system-edit" ).append(colorRadio);
    $( "#dialog-system-edit" ).append('<input id="system-edit-label" type="text" value="'+ data.label +'">');
    $( "#dialog-system-edit" ).data({data: data, callback: callback}).dialog('open');
}

function cancelNodeEdit(callback) {
  clearNodePopUp();
  callback(null);
}

function saveNodeData(data, callback) {
  callback(data);
}

function editEdgeWithoutDrag(data, callback) {
  // filling in the popup DOM elements
saveEdgeData(data, callback);
}

function saveEdgeData(data, callback) {
  if (typeof data.to === "object") data.to = data.to.id;
  if (typeof data.from === "object") data.from = data.from.id;
  data.label = ""
  callback(data);
}
function changeSystemColor(color, img) {
    console.log(color);
    let decoded = decodeURIComponent(img);
    let html = stringToHTML(decoded);
    html.getElementById("system-outline-color").setAttribute("fill", color);
    let decodedSwapped = html.body.innerHTML.split("data:image/svg+xml;charset=utf-8,")[1];
    let url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(decodedSwapped);
    return url
}
