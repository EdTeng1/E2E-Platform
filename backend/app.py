from datetime import datetime
from turtle import title
from flask import Flask, request, json, jsonify, render_template
from flask_cors import CORS, cross_origin
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
from queryKOLProfile import queryAll

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////" + os.path.join(
    app.root_path, "meetings.db"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)


@app.cli.command()
@click.option("--drop", is_flag=True, help="create data base after drop")
def createdb(drop):
    if drop:
        db.drop_all()
    db.create_all()
    click.echo("initialized database")


@app.cli.command()
def initialdb():
    data = [
        {
            "title": "Dr",
            "first_name": "Saad",
            "last_name": "Galvan",
            "pronouns": "pronouns pronouns",
            "institute": "The University of Texas MD Anderson Cancer Center",
            "state": "TX",
            "city": "Houston",
            "zip_code": "",
            "phone_number": "",
            "email": "123@qq.com",
        }
    ]

    for item in data:
        kol = KOLProfile(
            title=item["title"],
            first_name=item["first_name"],
            last_name=item["last_name"],
            pronouns=item["pronouns"],
            institute=item["institute"],
            state=item["state"],
            city=item["city"],
            zip_code=item["zip_code"],
            phone_number=item["phone_number"],
            email=item["email"],
        )
        db.session.add(kol)
    db.session.commit()

    click.echo("success")


@app.route("/queryall/<table>")
def queryall(table):
    if table == "kol-profile":
        return queryAll()


@app.route("/")
def index():

    return "Hello , This is falsk"


@app.route("/postData", methods=["POST"])
@jwt_required()
def postData():

    user_id = get_jwt_identity()
    data = request.get_json()
    # TODO: add user_id

    new_rider = Rider(
        start=data["start"],
        end=data["end"],
        content=data["content"],
        time=datetime.utcnow(),
        user_id=user_id,
    )
    db.session.add(new_rider)
    db.session.commit()
    return jsonify({"message": "Post Successful"})


@app.route("/testGetPost", methods=["GET", "POST"])
def testGetPost():
    # get all post data from database
    # find the nearest posts for start and end position
    # start, end = form_start, form_end
    # data1 = distance.match(start, end)
    # print("Print Matched Data", data1)
    data1 = {
        "post_id": 1,
        "start": [47.625168, -122.337751],
        "end": [47.625168, -122.3378],
    }

    bodydata = request.json
    print(bodydata)
    if bodydata is None:
        print("no body data")

    return jsonify(data1)
    # return json.dumps(data)


@app.route("/json")
def send_json():
    data = {"name": "John", "age": 30, "city": "New York"}
    return json.dumps(data)


@app.route("/SignUp", methods=["POST", "OPTIONS"])
@cross_origin()
def register():
    if request.method == "OPTIONS":
        return jsonify({"message": "Prelight check successful"})
    data = request.json

    try:
        new_user = User(
            name=data["name"],
            email=data["email"],
            password_hash=generate_password_hash(data["password"]),
            age=data["age"],
            gender=data["gender"],
            city=data["city"],
        )
        db.session.add(new_user)
        db.session.commit()
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({"message": "Please Try Again"}), 401
    return jsonify({"message": "Sign Up Successful"}), 200


@app.route("/SignIn", methods=["POST", "OPTIONS"])
@cross_origin()
def login():
    data = request.json

    user = User.query.filter_by(email=data["email"]).first()
    if user:
        # 创建JWT令牌
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token, message="Sign In Successful")
    else:
        return jsonify({"message": "Wrong Username or Password"}), 401
