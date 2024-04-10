import os
import mysql.connector
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from flask import Blueprint

kol_profile_blueprint = Blueprint("kol_profile", __name__) 

app = Flask(__name__, static_folder="../frontend/build", static_url_path="")

# MySQL database connection details
db_config = {
    "host": "genmab-e2e.cpkissg02fmv.us-west-2.rds.amazonaws.com",
    "user": "admin",
    "password": "e2e_platform",
    "database": "genmab_e2e",
}

@app.route("/getProfile/<profileId>", methods=["POST"])
def search_kol_profile_app(profileId):
    return search_kol_profile(profileId)

@kol_profile_blueprint.route("/getProfile/<profileId>", methods=["POST"])
def search_kol_profile_blueprint(profileId):
    return search_kol_profile(profileId)

def search_kol_profile(profileId):
    data = request.json
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Search for profile using profileId
        search_query = "SELECT Title, FirstName, LastName, Pronouns, Institute, State, City, Zip, PhoneNumber, Email FROM kol_profile WHERE id = %s"
        cursor.execute(search_query, (profileId,))
        profile = cursor.fetchone()

        if profile:
            # Convert the profile to a dictionary or a similar structure if needed
            # Assuming profile columns follow the order in the INSERT query below
            profile_dict = {
                "title": profile[0],
                "firstName": profile[1],
                "lastName": profile[2],
                "pronouns": profile[3],
                "institute": profile[4],
                "state": profile[5],
                "city": profile[6],
                "zip": profile[7],
                "phoneNumber": profile[8],
                "email": profile[9],
                "engagements": []
                # Add more fields as necessary
            }

            # Fetch related engagements from kol_profile_engagement
            engagement_query = "SELECT engagementA, functionA, notes, followUpRequested, functionB, informationRequested FROM kol_profile_engagement WHERE profileID = %s"
            cursor.execute(engagement_query, (profileId,))
            engagements = cursor.fetchall()  # Fetch all matching rows

            # Append each engagement to the profile_dict
            for engagement in engagements:
                profile_dict["engagements"].append({
                    "engagementA": engagement[0],
                    "functionA": engagement[1],
                    "notes": engagement[2],
                    "followUpRequested": engagement[3],
                    "functionB": engagement[4],
                    "informationRequested": engagement[5],
                })
        else:
            return jsonify({"message": "Profile not found"}), 404

    except mysql.connector.Error as e:
        return jsonify({"message": str(e)}), 500

    finally:
        # Ensure that cursor and connection are closed properly in a finally block
        cursor.close()
        conn.close()

    return jsonify(profile_dict), 200
    

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    CORS(app)
    app.run(host="localhost", port="5000", debug=True)
