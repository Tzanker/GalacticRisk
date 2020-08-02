from app import db


class Army(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    divisions = db.relationship('Division', backref='army', lazy='dynamic')
    def __repr__(self):
        return '<id {}>'.format(self.id)

    def getDict(self):
        divisionDicts=[division.getDict() for division in self.divisions]
        return {
            'id':self.id,
            'divisions': divisionDicts
        }

    def attachToArmy(self, *args):
        # Attaches args to this model
        # Expects a list for each arg, it is a assumed that each input is a child of this model
        for divisionList in args:
            for division in divisionList:
                division.army_id = self.id
                db.session.add(division)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Division(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    troops = db.relationship('Troop', backref='army', lazy='dynamic')
    specials = db.relationship('Special', backref='army', lazy='dynamic')
    ships = db.relationship('Ship', backref='army', lazy='dynamic')
    system_id = db.Column(db.Integer, db.ForeignKey('system.id'))
    army_id = db.Column(db.Integer, db.ForeignKey('army.id'))
    def __repr__(self):
        return '<systemId {} Id {}>'.format(self.system_id, self.id)
    def getDict(self):
        troopDicts=[troop.getDict() for troop in self.troops]
        shipDicts=[ship.getDict() for ship in self.ships]
        specialDicts=[special.getDict() for special in self.specials]
        return {
            'id':self.id,
            'Troops':troopDicts,
            'Specials': specialDicts,
            'Ships':  shipDicts,
            'System': self.system_id
        }

    def attachToDivision(self, *args):
        # Attaches args to division
        # Expects a list for each arg, it is a assumed that each input has a division_id parameter

        for troopList in args:
            for troop in troopList:
                troop.division_id = self.id
                db.session.add(troop)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()
class Troop(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    action = db.Column(db.String)
    location = db.Column(db.String)
    training = db.Column(db.Boolean)
    number = db.Column(db.Integer)
    division_id = db.Column(db.Integer, db.ForeignKey('division.id'))
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
            'division':self.division_id
        }
    def Split(self, counts):
        #takes a list of numbers, splitting the unit into a series of new units,
        available = self.number
        failcount=0
        troopList=[]
        for count in counts:
            if available - count > 0:
                t = Troop(type=self.type, action=self.action, location=self.location, training=self.training, number=count,
                          division_id=self.division_id)
                available -= count
                troopList.append(t)
            else:
                failcount += 1
        if not failcount:
            db.session.add_all(troopList)
            if available:
                self.number= available
            else:
                db.session.delete(self)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()

class Special(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    action = db.Column(db.String)
    location=db.Column(db.String)
    details = db.Column(db.String)
    training = db.Column(db.Boolean)
    number = db.Column(db.Integer)
    division_id = db.Column(db.Integer, db.ForeignKey('division.id'))
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
            'division':self.division_id
        }
    def Split(self, counts):
        #takes a list of numbers, splitting the unit into a series of new units,
        available = self.number
        failcount=0
        troopList=[]
        for count in counts:
            if available - count > 0:
                t = Special(name=self.name, action=self.action, location=self.location, training=self.training,details=self.details ,number=count,
                          division_id=self.division_id)
                available -= count
                troopList.append(t)
            else:
                failcount += 1
        if not failcount:
            db.session.add_all(troopList)
            if available:
                self.number= available
            else:
                db.session.delete(self)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()
class Ship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    action = db.Column(db.String)
    location = db.Column(db.String)
    building = db.Column(db.Boolean)
    number = db.Column(db.Integer)
    division_id = db.Column(db.Integer, db.ForeignKey('division.id'))
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
            'division':self.division_id
        }
    def Split(self, counts):
        #takes a list of numbers, splitting the unit into a series of new units,
        available = self.number
        failcount=0
        troopList=[]
        for count in counts:
            if available - count > 0:
                t = Ship(type=self.type, action=self.action, location=self.location, building=self.building, number=count,
                          division_id=self.division_id)
                available -= count
                troopList.append(t)
            else:
                failcount += 1
        if not failcount:
            db.session.add_all(troopList)
            if available:
                self.number= available
            else:
                db.session.delete(self)
        db.session.commit()
    def delete(self):
        db.session.delete(self)
        db.session.commit()
class System(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    color = db.Column(db.String)
    name = db.Column(db.String)
    xCoord = db.Column(db.Integer)
    yCoord = db.Column(db.Integer)
    owner = db.Column(db.String)
    details = db.Column(db.String)
    divisions = db.relationship('Division', backref='system', lazy='dynamic')
    paths = db.relationship('SysPath', backref='system', lazy='dynamic')
    def __repr__(self):
        return '<Name: {} Status: {}>'.format(self.name, self.owned)

    def getDict(self):
        divisionDicts = [division.getDict() for division in self.divisions]
        return{
            'id': self.id,
            'color': self.color,
            "xCoord": self.xCoord,
            "yCoord": self.yCoord,
            'name': self.name,
            'details':self.details,
            'owner': self.owner,
            'divisions':divisionDicts
        }
    def attachToSystem(self, *args):
        # Attaches args to this model
        # Expects a list for each arg, it is a assumed that each input is a child of this model
        for divisionList in args:
            for division in divisionList:
                division.system_id = self.id
                db.session.add(division)
        db.session.commit()
class SysPath(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    system_id = db.Column(db.Integer, db.ForeignKey('system.id'))
    path_id = db.Column(db.Integer, db.ForeignKey('path.id'))
class Path(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    systems = db.relationship('SysPath', backref='path', lazy='dynamic')
    def __repr__(self):
        return '<id:{}>'.format(self.id)

    def getDict(self):
        return{
            'id': self.id,
            'to': self.systems[0].system_id,
            'from': self.systems[1].system_id,
        }
