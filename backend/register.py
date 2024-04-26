import logging
import os
import mysql.connector
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Blueprint
from flask_jwt_extended import create_access_token
import datetime

loginSignup_blueprint = Blueprint("register", __name__)

app = Flask(__name__, static_folder="../frontend/build", static_url_path="")

db_config = {
    "host": "genmab-e2e.cpkissg02fmv.us-west-2.rds.amazonaws.com",
    "user": "admin",
    "password": "e2e_platform",
    "database": "genmab_e2e",
}

# Database connection
def get_db_connection():
    return mysql.connector.connect(**db_config)

@loginSignup_blueprint.route("/SignUp", methods=["POST"])
@cross_origin()
def register_blueprint():
    return register()

@app.route("/SignUp", methods=["POST"])
@cross_origin()
def register_app():
    return register()

def register():
    print("register")
    data = request.json
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"message": "Missing data in request"}), 400
    password_hash = generate_password_hash(data["password"])
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (email, password_hash) VALUES (%s, %s)", (data["email"], password_hash))
        conn.commit()
        return jsonify({"message": "Sign Up Successful"}), 200
    except mysql.connector.IntegrityError as e:
        conn.rollback()
        logging.error(f"Database Error: {str(e)}")  # Log the specific database error
        return jsonify({"message": "Email already exists"}), 401
    except Exception as e:
        logging.error(f"Unexpected Error: {str(e)}")  # Log unexpected errors
        return jsonify({"message": "Internal Server Error"}), 500
    finally:
        cursor.close()
        conn.close()

@loginSignup_blueprint.route("/SignIn", methods=["POST"])
@cross_origin()
def login():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, password_hash FROM users WHERE email = %s", (data["email"],))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if user and check_password_hash(user['password_hash'], data['password']):
        access_token = create_access_token(identity=user['id'], expires_delta=datetime.timedelta(hours=24))
        return jsonify(access_token=access_token, message="Sign In Successful")  # Directly return the token string
    else:
        return jsonify({"message": "Wrong Username or Password"}), 401


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    CORS(app)
    app.run(host="127.0.0.1", port="5000", debug=True)