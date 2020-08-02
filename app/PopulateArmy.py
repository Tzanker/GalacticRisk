from app.models import *
#assumingall army related empty
army = Army()
db.session.add(army)
db.session.commit()
army = Army.query.first()
division = Division(system_id=1 ,army_id=army.id)
db.session.add(division)
db.session.commit()
division= Division.query.first()
t = Troop(type="Grunts", number=10000)
s = Ship(type='Fighter', number=100)
t.division_id=division.id
t.location=System.query.filter_by(id=division.system_id).first().name
s.division_id=division.id
s.location=System.query.filter_by(id=division.system_id).first().name
db.session.add_all([s,t])
db.session.commit()
