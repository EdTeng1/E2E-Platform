from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
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
            "INSERT INTO [table_name] (title, firstName, lastName, pronouns, institute, state, city, zip, phoneNumber, email, engagementA, functionA, notes, followUpRequested, functionB, informationRequested) "
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

if __name__ == '__main__':
    app.run(host='localhost', port='3000', debug=True)
