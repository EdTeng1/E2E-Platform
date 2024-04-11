from flask import Flask, jsonify, request
from flask_cors import CORS

# from config import Config
# from . import main
from models import KOLProfile, db

from questionnaire import questionnaire_blueprint
from kol_profile_test import kol_profile_blueprint

app = Flask(__name__, static_folder="../frontend/build", static_url_path="")
app.register_blueprint(questionnaire_blueprint)
app.register_blueprint(kol_profile_blueprint)

# for cors
CORS(app)

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////" + os.path.join(
#     app.root_path, "meetings.db"
# )
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:Peter12345@localhost/kolData"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)


# # genetate database in local
# @app.cli.command()
# @click.option("--drop", is_flag=True, help="create data base after drop")
# def createdb(drop):
#     if drop:
#         db.drop_all()
#     db.create_all()
#     click.echo("initialized database")


# # initial fake data to table
# @app.cli.command()
# def initialdb():
#     queryKOLProfile.generateData()
#     click.echo("success")


@app.route("/")
def index():
    return "Hello , This is falsk"


# @app.route("/queryAll/<table>")
# def queryall(table):
#     if table == "kol-profile":
#         return queryKOLProfile.queryAll()


# @app.route("/queryKOLProfileByName")
# def queryKOLProfileByName():
#     name = request.args.get("name")
#     if not name:
#         return []


#     return queryKOLProfile.queryByName(name)
@app.route("/search", methods=["POST"])
def search():
    print(request)
    # query = request.args.get()
    # print("query", query)
    # results = KOLProfile.query.filter(KOLProfile.name.like(f"%{query}%")).all()
    # return jsonify([user.to_dict() for user in results])
    return jsonify({"message": "search successful"})


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

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(host="localhost", port="5000", debug=True)