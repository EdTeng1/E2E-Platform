from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__, static_folder='../frontend/src', static_url_path='')
CORS(app)

# MySQL database connection details
db_config = {
    'host': '',
    'user': '',
    'password': '',
    'database': ''
}


@app.route('/questionaire', methods=['POST'])
def submit_form():
    data = request.json
    print(data)
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Update your query to include new fields
        query = (
            "INSERT INTO form_responses (title, firstName, lastName, pronouns, institute, state, city, zip, phoneNumber, email, engagementA, functionA, notes, followUpRequested, functionB, informationRequested) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
        cursor.execute(query, (
            data['title'], data['firstName'], data['lastName'], data['pronouns'], data['institute'],
            data['state'], data['city'], data['zip'], data['phoneNumber'], data['email'],
            data['engagementA'], data['functionA'], data['notes'],
            data['followUpRequested'], data['functionB'], data['informationRequested']
        ))

        conn.commit()
        return jsonify({'message': 'Form submitted successfully'}), 200
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({'message': 'Failed to submit form'}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def serve(path):
#     if path != "" and os.path.exists(app.static_folder + '/' + path):
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='localhost', port='5000', debug=True)
