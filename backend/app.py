from datetime import datetime
from turtle import title
from flask import Flask, request, json, jsonify, render_template
from flask_cors import CORS, cross_origin
from sqlalchemy import null
from sqlalchemy.exc import IntegrityError
import click

# from config import Config
# from . import main
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity,
)
import os
from flask import Flask
from models import KOLProfile, db
import queryKOLProfile

app = Flask(__name__)

# for cors
CORS(app)

# sqlite
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////" + os.path.join(
#     app.root_path, "meetings.db"
# )

# mysql+pymysql//username:passwor@host:port/database
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:123456@127.0.0.1:3306/flaskdatabase?charset=utf8mb4"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
db.init_app(app)


# genetate database in local
@app.cli.command()
@click.option("--drop", is_flag=True, help="create data base after drop")
def createtable(drop):
    if drop:
        db.drop_all()
    db.create_all()
    click.echo("initialized database")


# initial fake data to table
@app.cli.command()
def initialtable():
    queryKOLProfile.generateData()
    click.echo("success")


@app.route("/")
def index():
    return "Hello , This is falsk"


@app.route("/queryAll/<table>")
def queryall(table):
    if table == "kol-profile":
        return queryKOLProfile.queryAll()


@app.route("/queryKOLProfileByName")
def queryKOLProfileByName():
    name = request.args.get("name")
    if name == None:
        return []

    return queryKOLProfile.queryByName(name)


# @app.route("/testGetPost", methods=["GET", "POST"])
# def testGetPost():
#     # get all post data from database
#     # find the nearest posts for start and end position
#     # start, end = form_start, form_end
#     # data1 = distance.match(start, end)
#     # print("Print Matched Data", data1)
#     data1 = {
#         "post_id": 1,
#         "start": [47.625168, -122.337751],
#         "end": [47.625168, -122.3378],
#     }

#     bodydata = request.json
#     print(bodydata)
#     if bodydata is None:
#         print("no body data")

#     return jsonify(data1)
#     # return json.dumps(data)


# @app.route("/json")
# def send_json():
#     data = {"name": "John", "age": 30, "city": "New York"}
#     return json.dumps(data)


# @app.route("/SignUp", methods=["POST", "OPTIONS"])
# @cross_origin()
# def register():
#     if request.method == "OPTIONS":
#         return jsonify({"message": "Prelight check successful"})
#     data = request.json

#     try:
#         new_user = User(
#             name=data["name"],
#             email=data["email"],
#             password_hash=generate_password_hash(data["password"]),
#             age=data["age"],
#             gender=data["gender"],
#             city=data["city"],
#         )
#         db.session.add(new_user)
#         db.session.commit()
#     except IntegrityError as e:
#         db.session.rollback()
#         return jsonify({"message": "Please Try Again"}), 401
#     return jsonify({"message": "Sign Up Successful"}), 200


# @app.route("/SignIn", methods=["POST", "OPTIONS"])
# @cross_origin()
# def login():
#     data = request.json

#     user = User.query.filter_by(email=data["email"]).first()
#     if user:
#         # 创建JWT令牌
#         access_token = create_access_token(identity=user.id)
#         return jsonify(access_token=access_token, message="Sign In Successful")
#     else:
#         return jsonify({"message": "Wrong Username or Password"}), 401
