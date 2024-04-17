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
                "engagements": [],
                "scores":[],
                # Add more fields as necessary
            }

            scoreinfo_query = "SELECT Claims, Patients, Publications, Guidelines, Trials, Grants, Congress, Digital_Posts FROM kol_score WHERE first = %s and last = %s"
            cursor.execute(scoreinfo_query, (profile[1], profile[2],))
            scores = cursor.fetchone()  # 使用 fetchone() 因为我们假设每个 profileId 只有一条得分记录



            if scores:  # 确保有得分信息存在
                profile_dict["scores"].append({"aspect": "Claims", "value": scores[0]})
                profile_dict["scores"].append({"aspect": "Patients", "value": scores[1]})
                profile_dict["scores"].append({"aspect": "Publications", "value": scores[2]})
                profile_dict["scores"].append({"aspect": "Guidelines", "value": scores[3]})
                profile_dict["scores"].append({"aspect": "Trials", "value": scores[4]})
                profile_dict["scores"].append({"aspect": "Grants", "value": scores[5]})
                profile_dict["scores"].append({"aspect": "Congress", "value": scores[6]})
                profile_dict["scores"].append({"aspect": "Digital_Posts", "value": scores[7]})


            # Fetch related engagements from kol_profile_engagement
            engagement_query = "SELECT profileID, engagementID, engagementA, functionA, notes, followUpRequested, functionB, informationRequested FROM kol_profile_engagement WHERE profileID = %s"
            cursor.execute(engagement_query, (profileId,))
            engagements = cursor.fetchall()  # Fetch all matching rows

            # Append each engagement to the profile_dict
            for engagement in engagements:
                profile_dict["engagements"].append({
                    "profileID": engagement[0],
                    "engagementID": engagement[1],
                    "engagementA": engagement[2],
                    "functionA": engagement[3],
                    "notes": engagement[4],
                    "followUpRequested": engagement[5],
                    "functionB": engagement[6],
                    "informationRequested": engagement[7],
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

@app.route('/updateProfile', methods=['POST'])
def update_profile_app():
    return update_profile()

@kol_profile_blueprint.route('/updateProfile', methods=['POST'])
def update_profile_blueprint():
    return update_profile()

def update_profile():
    data = request.json
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Check if the profile exists
        cursor.execute("SELECT COUNT(*) FROM kol_profile WHERE id = %s", (data.get('id'),))
        profile_exists = cursor.fetchone()[0] > 0

        if not profile_exists:
            return jsonify({"message": "Profile not found"}), 404

        # Splitting name into first and last names. Assuming the first word is the first name and the rest is the last name.
        full_name = data.get('name', '').split(' ', 1)
        first_name = full_name[0] if len(full_name) > 0 else ''
        last_name = full_name[1] if len(full_name) > 1 else ''

        # Splitting location into city and state. Assuming the format is "City, State".
        location = data.get('location', '').split(', ')
        city = location[0] if len(location) > 0 else ''
        state = location[1] if len(location) > 1 else ''

        sql = """
        UPDATE kol_profile
        SET FirstName=%s, LastName=%s,
            Institute=%s, State=%s, City=%s, Email=%s
        WHERE id=%s
        """
        params = (
            first_name, last_name,
            data.get('institution'), state, city,
            data.get('email'), data.get('id')
        )
        cursor.execute(sql, params)
        conn.commit()

        return jsonify({"message": "Profile updated successfully"}), 200
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"message": "Database error"}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/updateHistory', methods=['POST'])
def update_history_app():
    return update_history()

@kol_profile_blueprint.route('/updateHistory', methods=['POST'])
def update_history_blueprint():
    return update_history()

def update_history():
    data = request.json
    profile_id = data.get('profileID')

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        for engagement in data.get('history', []):
            if engagement.get('engagementID') != '-1':
                sql = """
                UPDATE kol_profile_engagement
                SET engagementA=%s, functionA=%s, notes=%s, followUpRequested=%s,
                    functionB=%s, informationRequested=%s
                WHERE engagementID=%s AND profileID=%s
                """
                params = (
                    engagement.get('engagementA'), engagement.get('functionA'), engagement.get('notes'),
                    engagement.get('followUpRequested'), engagement.get('functionB'), engagement.get('informationRequested'),
                    engagement.get('engagementID'), engagement.get('profileID')
                )
            else:
                sql = """
                INSERT INTO kol_profile_engagement (profileID, engagementA, functionA, notes, followUpRequested, functionB, informationRequested)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                params = (
                    engagement.get("profileID"), engagement.get('engagementA'), engagement.get('functionA'), engagement.get('notes'),
                    engagement.get('followUpRequested'), engagement.get('functionB'), engagement.get('informationRequested')
                )
            cursor.execute(sql, params)
            conn.commit()

        return jsonify({"message": "History updated successfully"}), 200
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({"message": "Database error"}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

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
