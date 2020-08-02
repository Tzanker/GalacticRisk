
import {getArmy} from "./Fetch.js";


async function displayArmy(){
    let army = await getArmy();
    console.log(army);
    for (let index in army.divisions) {
        //Troops
        $('main').append('<div id="division_'+army.divisions[index].id+'" class="army_division"> ' +
                    '<h2 class="text-left">\n' +
                    '  Division '+army.divisions[index].id+
                    '  <small class="text-muted">location: '+army.divisions[index].system_id+'</small>\n' +
                    '</h2>');

        let troops = troopsHTML(army.divisions[index].Troops)
        $('#division_'+army.divisions[index].id).append(troops);
        //ships
        let ships = shipsHTML(army.divisions[index].Ships)
        $('#division_'+army.divisions[index].id).append(ships);
        //special
        let special = specialHTML(army.divisions[index].Specials)
        $('#division_'+army.divisions[index].id).append(special);
    }
}

function troopsHTML(troops){
        let troopHTML=''
        troops.map(troop=>{
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

function shipsHTML(ships){
        let shipsHTML=''
        ships.map(ship=>{
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

function specialHTML(specials){
        let specialHTML=''
        specials.map(special=>{
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
