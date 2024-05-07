import os

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required
from kol_profile_test import kol_profile_blueprint

# from config import Config
# from . import main
from models import KOLProfile, KOLScore, db
from questionnaire import questionnaire_blueprint
from register import loginSignup_blueprint
from sqlalchemy import and_, or_
from sqlalchemy.sql import func

app = Flask(__name__, static_folder="../frontend/build", static_url_path="")
app.register_blueprint(questionnaire_blueprint)
app.register_blueprint(kol_profile_blueprint)
app.register_blueprint(loginSignup_blueprint)

# Configure the JWT Secret Key
app.config["JWT_SECRET_KEY"] = "SHA256"
jwt = JWTManager(app)

# for cors
CORS(app)

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////" + os.path.join(
#     app.root_path, "meetings.db"
# )
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://admin:e2e_platform@genmab-e2e.cpkissg02fmv.us-west-2.rds.amazonaws.com:3306/genmab_e2e"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
db.init_app(app)

Pacific = ["California", "Washington", "Oregon", "Nevada"]
Mountain = [
    "Arizona",
    "Colorado",
    "Idaho",
    "Montana",
    "Nevada",
    "New Mexico",
    "Utah",
    "Wyoming",
]
Central = [
    "Alabama",
    "Arkansas",
    "Illinois",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Nebraska",
    "North Dakota",
    "Oklahoma",
    "South Dakota",
    "Texas",
    "Tennessee",
    "Wisconsin",
]
Eastern = [
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Indiana",
    "Kentucky",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "New Hampshire",
    "New Jersey",
    "New York",
    "North Carolina",
    "Ohio",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "Tennessee",
    "Vermont",
    "Virginia",
    "West Virginia",
]

# Map time zones to states
time_zone_states = {
    "Pacific": Pacific,
    "Mountain": Mountain,
    "Central": Central,
    "Eastern": Eastern,
}

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


# @app.route("/search", methods=["POST"])
# @jwt_required()
# def search():
#     print("Received search request")
#     if not request.json or "query" not in request.json:
#         return jsonify({"error": "Bad request, no query provided"}), 400

#     query = request.json["query"].strip()

#     print(f"Received query: {query}")
#     if query:
#         results = (
#             db.session.query(
#                 KOLProfile.id,
#                 KOLProfile.Title,
#                 KOLProfile.FirstName,
#                 KOLProfile.LastName,
#                 KOLProfile.State,
#                 KOLScore.Total,
#             )
#             .join(
#                 KOLScore,
#                 and_(
#                     KOLProfile.FirstName == KOLScore.First,
#                     KOLProfile.LastName == KOLScore.Last,
#                 ),
#             )
#             .filter(
#                 or_(
#                     KOLProfile.FirstName.contains(query),
#                     KOLProfile.LastName.contains(query),
#                 )
#             )
#             .all()
#         )
#         print(f"Found {len(results)} results")

#         # Formatting the results into a list of dicts
#         response = [
#             {
#                 "id": result[0],
#                 "title": result[1],
#                 "name": f"{result[2]} {result[3]}",
#                 "location": f"{result[4]}",
#                 "score": int(result[5]),
#             }
#             for result in results
#         ]
#         print(response)
#         return jsonify(response)
#         # Simulate a database search. Here, you'd typically query your database.
#     else:
#         return jsonify({"error": "Empty query"}), 400


@app.route("/search", methods=["POST"])
@jwt_required()
def search():
    print("Received search request")
    if not request.json or "query" not in request.json:
        return jsonify({"error": "Bad request, no query provided"}), 400

    query = request.json["query"].strip()
    search_type = request.json["searchType"]

    print(f"Received query: {query}")
    if query:

        if search_type == "institution":
            results = (
                db.session.query(
                    KOLProfile.id,
                    KOLProfile.Title,
                    KOLProfile.FirstName,
                    KOLProfile.LastName,
                    KOLProfile.State,
                    KOLScore.Institution,
                    func.coalesce(KOLScore.Total, -1).label('Total')
                )
                .join(
                    KOLScore,
                    and_(
                        KOLProfile.FirstName == KOLScore.First,
                        KOLProfile.LastName == KOLScore.Last,
                    ),
                )
                .filter(
                    KOLScore.Institution.contains(query)
                )  # Assuming 'Institution' is a field in KOLProfile
                .all()
            )
        else:

            results = (
                db.session.query(
                    KOLProfile.id,
                    KOLProfile.Title,
                    KOLProfile.FirstName,
                    KOLProfile.LastName,
                    KOLProfile.State,
                    KOLScore.Institution,
                    func.coalesce(KOLScore.Total, -1).label('Total')
                )
                .join(
                    KOLScore,
                    and_(
                        KOLProfile.FirstName == KOLScore.First,
                        KOLProfile.LastName == KOLScore.Last,
                    ),
                )
                .filter(
                    or_(
                        KOLProfile.FirstName.contains(query),
                        KOLProfile.LastName.contains(query),
                    )
                )
                .all()
            )
        print(f"Found {len(results)} results")

        # Formatting the results into a list of dicts
        response = [
            {
                "id": result[0],
                "title": result[1],
                "name": f"{result[2]} {result[3]}",
                "location": f"{result[4]}",
                "institution": f"{result[5]}",
                "score": int(result[6]),
            }
            for result in results
        ]
        print(response)
        return jsonify(response)
        # Simulate a database search. Here, you'd typically query your database.
    else:
        return jsonify({"error": "Empty query"}), 400


@app.route("/api/users", methods=["POST"])
def get_users():

    data = request.get_json()
    location_filter = data.get("location")
    score_filter = data.get("score")
    users = data.get("users", [])

    if location_filter and location_filter in time_zone_states:
        valid_states = time_zone_states[location_filter]
        users = [user for user in users if user["location"] in valid_states]

    if score_filter:
        if score_filter == "A":
            users = [user for user in users if user["score"] > 60]
        elif score_filter == "B":
            users = [user for user in users if 40 <= user["score"] <= 60]
        elif score_filter == "C":
            users = [user for user in users if user["score"] < 40]

    return jsonify(users)


@jwt.expired_token_loader
def my_expired_token_callback(jwt_header, jwt_payload):
    return (
        jsonify({"status": 401, "sub_status": 42, "msg": "The token has expired"}),
        401,
    )


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
