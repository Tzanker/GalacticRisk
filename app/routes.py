from app.utils import *
from app import app
from flask import render_template, jsonify, request
from app.models import Army
import codecs
@app.route('/')
@app.route('/index')
def index():
    script = "../static/js/MapRegular.js"
    return render_template("index.html", mapScript=script)

@app.route('/mapMaker')
def maker():
    script = "../static/js/MapMaker.js"
    return render_template("index.html", mapScript=script)

@app.route('/army')
def army():
    return render_template("Army.html")

@app.route('/getArmy',methods=["GET"])
def getarmy():
    army = fullArmy()
    jsoned=jsonify(army)
    return jsoned
@app.route('/dev')
def dev():
    script = "../static/js/mapAssembler.js"
    return render_template("index.html", mapScript=script)
@app.route('/getMap')
def getMap():
    systems = getSystems()
    paths = getPaths()
    return jsonify({'nodes': systems, 'edges': paths})
@app.route('/saveMap/',methods=["POST"])
def saveMap():
    savePathAndNodes(request.json)
    return "true"