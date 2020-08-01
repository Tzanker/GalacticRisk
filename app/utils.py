from app.models import *
from app import db
def fullArmy(): #Returns Nested Dictionaries of full army
    army = Army.query.first()
    return army.getDict()
def getSystems():
    systems = []
    for system in  System.query.all():
        systems.append(system.getDict())
    return systems
def getPaths():
    paths = []
    for path in Path.query.all():
        paths.append(path.getDict())
    return paths


def attachToArmy(armyId):
    troops = Troop.query.all()
    ships = Ship.query.all()
    specials = Special.query.all()
    for t in troops:
        t.army_id=armyId
        db.session.add(t)
    for s in ships:
        s.army_id = armyId
        db.session.add(s)
    for sp in specials:
        sp.army_id=armyId
        db.session.add(sp)
    db.session.commit()
def savePathAndNodes(data): #TODO implement deletion of objects no longer in map
    for key in data['nodes']:
        id=data['nodes'][key]['id']
        system = System.query.filter_by(id=id).first()
        if system:
            system.xCoord = data['nodes'][key]['x'] #TODO implement full system saving
            system.yCoord = data['nodes'][key]['y']
            db.session.add(system)
            db.session.commit()
            print(key, flush=True)
    print('Paths', flush=True)
    for key in data['paths']:
        id=data['paths'][key]['id']
        path = Path.query.filter_by(id=id).all()
        print(path, flush=True)
        if path:
            pass #TODO implement this
        else:
            newPath = Path()
            print(newPath, flush=True)
            db.session.add(newPath)
            db.session.commit()
            PtoSFrom = SysPath(system_id=data['paths'][key]['from'], path_id=newPath.id)
            PtoSTo = SysPath(system_id=data['paths'][key]['to'], path_id=newPath.id)
            db.session.add_all([PtoSFrom, PtoSTo])
            db.session.commit()
        print(key, flush=True)

    print(Path.query.all(), flush=True)

