from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)

def submit_form():
    data = request.json
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # First, insert into KOL_PROFILE
        profile_query = (
            "INSERT INTO KOL_PROFILE (Title, FirstName, LastName, Pronouns, Institute, State, City, Zip, PhoneNumber, Email) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
        profile_data = (
            data['title'], data['firstName'], data['lastName'], data['pronouns'], data['institute'],
            data['state'], data['city'], data['zip'], data['phoneNumber'], data['email']
        )
        cursor.execute(profile_query, profile_data)
        profile_id = cursor.lastrowid  # Retrieve the id of the newly inserted profile

        # Then, insert into KOL_PROFILE_ENGAGEMENT with the obtained profile_id
        engagement_query = (
            "INSERT INTO KOL_PROFILE_ENGAGEMENT (profileID, engagementA, functionA, notes, followUpRequested, functionB, informationRequested) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s)")
        engagement_data = (
            profile_id, data['engagementA'], data['functionA'], data['notes'],
            data['followUpRequested'], data['functionB'], data['informationRequested']
        )
        cursor.execute(engagement_query, engagement_data)

        conn.commit()
        return jsonify({'message': 'Form submitted successfully'}), 200
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({'message': 'Failed to submit form'}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='localhost', port='5000', debug=True)
