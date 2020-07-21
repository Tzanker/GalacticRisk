$("map").innerHTML="ok at least this worked"
import {getArmy} from "./Fetch.js";
$("map").innerHTML="interesting"

async function displayArmy(){
    let army = await getArmy();
    console.log(army);
    //Troops
    let troops = troopsHTML(army)
    $('main').append(troops);
    //ships
    let ships = shipsHTML(army)
    $('main').append(ships);
    //special
    let special = specialHTML(army)
    $('main').append(special);
}

function troopsHTML(army){
        let troopHTML=''
    army.Troops.map(troop=>{
        let html =  '    <tr>\n' +
                    '      <th scope="row">' + troop.id  + '</th>\n' +
                    '      <td>' + troop.type  + '</td>\n' +
                    '      <td>' + troop.location  + '</td>\n' +
                    '      <td>' + troop.number  + '</td>\n' +
                    '      <td>' + Boolean(troop.training)  + '</td>\n' +
                    '    </tr>'
        troopHTML+=html
    });
    let topHTML =   '<h3 class="text-left mt-5">\n' +
                    '  Troops\n' +
                    '  <small class="text-muted">Ground</small>\n' +
                    '</h3>'+
                    '<table class="table table-striped table-dark">\n' +
                    '  <thead>\n' +
                    '    <tr>\n' +
                    '      <th scope="col">ID</th>\n' +
                    '      <th scope="col">Type</th>\n' +
                    '      <th scope="col">Location</th>\n' +
                    '      <th scope="col">Number</th>\n' +
                    '      <th scope="col">Training</th>\n' +
                    '    </tr>\n' +
                    '  </thead>\n' +
                    '  <tbody>';
    let bottomHTML = '  </tbody>\n' + '</table>';
    let combinedHTML = topHTML+ troopHTML + bottomHTML;
    return combinedHTML
}

function shipsHTML(army){
        let shipsHTML=''
    army.Ships.map(ship=>{
        let html =  '    <tr>\n' +
                    '      <th scope="row">' + ship.id  + '</th>\n' +
                    '      <td>' + ship.type  + '</td>\n' +
                    '      <td>' + ship.location  + '</td>\n' +
                    '      <td>' + ship.number  + '</td>\n' +
                    '      <td>' + Boolean(ship.building)  + '</td>\n' +
                    '    </tr>'
        shipsHTML+=html
    });
    let topHTML = '<h3 class="text-left">\n' +
                    '  Ships\n' +
                    '  <small class="text-muted">Sky</small>\n' +
                    '</h3>'+   '<table class="table table-striped table-dark">\n' +
                    '  <thead>\n' +
                    '    <tr>\n' +
                    '      <th scope="col">ID</th>\n' +
                    '      <th scope="col">Type</th>\n' +
                    '      <th scope="col">Location</th>\n' +
                    '      <th scope="col">Number</th>\n' +
                    '      <th scope="col">Building</th>\n' +
                    '    </tr>\n' +
                    '  </thead>\n' +
                    '  <tbody>';
    let bottomHTML = '  </tbody>\n' + '</table>';
    let combinedHTML = topHTML+ shipsHTML + bottomHTML;
    return combinedHTML
}

function specialHTML(army){
        let specialHTML=''
    army.Specials.map(special=>{
        let html =  '    <tr>\n' +
                    '      <th scope="row">' + special.id  + '</th>\n' +
                    '      <td>' + special.name  + '</td>\n' +
                    '      <td>' + special.details  + '</td>\n' +
                    '      <td>' + special.location  + '</td>\n' +
                    '      <td>' + special.number  + '</td>\n' +
                    '      <td>' + Boolean(special.training)  + '</td>\n' +
                    '    </tr>'
        specialHTML+=html
    });
    let topHTML = '<h3 class="text-left">\n' +
                    '  Specials\n' +
                    '  <small class="text-muted">Getting creative are we?</small>\n' +
                    '</h3>'+   '<table class="table table-striped table-dark">\n' +
                    '  <thead>\n' +
                    '    <tr>\n' +
                    '      <th scope="col">ID</th>\n' +
                    '      <th scope="col">Type</th>\n' +
                    '      <th scope="col">Description</th>\n' +
                    '      <th scope="col">Location</th>\n' +
                    '      <th scope="col">Number</th>\n' +
                    '      <th scope="col">Training</th>\n' +
                    '    </tr>\n' +
                    '  </thead>\n' +
                    '  <tbody>';
    let bottomHTML = '  </tbody>\n' + '</table>';
    let combinedHTML = topHTML+ specialHTML + bottomHTML;
    return combinedHTML
}

displayArmy()
