from app.models import *
from app import db
def fullArmy(): #Returns Nested Dictionaries of full army
    army = Army.query.first()
    return army.getDict()


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