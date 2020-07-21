from app import db


class Army(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    troops = db.relationship('Troop', backref='army', lazy='dynamic')
    specials = db.relationship('Special', backref='army', lazy='dynamic')
    ships = db.relationship('Ship', backref='army', lazy='dynamic')
    def __repr__(self):
        return '<Troops {}>'.format(self.troops)

    def getDict(self):
        troopDicts=[troop.getDict() for troop in self.troops]
        shipDicts=[ship.getDict() for ship in self.ships]
        specialDicts=[special.getDict() for special in self.specials]
        return {
            'id':self.id,
            'Troops':troopDicts,
            'Specials': specialDicts,
            'Ships':  shipDicts
        }

class Troop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    action = db.Column(db.String)
    location = db.Column(db.String)
    training = db.Column(db.Boolean)
    number = db.Column(db.Integer)
    army_id = db.Column(db.Integer, db.ForeignKey('army.id'))
    def __repr__(self):
        return '<Type {} Number {}>'.format(self.type, self.number)
    def getDict(self):
        return{
            'id': self.id,
            'type': self.type,
            "action": self.action,
            "location": self.location,
            'training': self.training,
            'number':self.number,
            'army':self.army_id
        }
class Special(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    action = db.Column(db.String)
    location=db.Column(db.String)
    details = db.Column(db.String)
    training = db.Column(db.Boolean)
    number = db.Column(db.Integer)
    army_id = db.Column(db.Integer, db.ForeignKey('army.id'))
    def __repr__(self):
        return '<Type {} location {}>'.format(self.name, self.location)
    def getDict(self):
        return{
            'id': self.id,
            'name': self.name,
            "action": self.action,
            "location": self.location,
            'training': self.training,
            'details': self.details,
            'number':self.number,
            'army':self.army_id
        }
class Ship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    action = db.Column(db.String)
    location = db.Column(db.String)
    building = db.Column(db.Boolean)
    number = db.Column(db.Integer)
    army_id = db.Column(db.Integer, db.ForeignKey('army.id'))
    def __repr__(self):
        return '<Type {} Number {}>'.format(self.type, self.number)

    def getDict(self):
        return{
            'id': self.id,
            'type': self.type,
            "action": self.action,
            "location": self.location,
            'building': self.building,
            'number':self.number,
            'army':self.army_id
        }