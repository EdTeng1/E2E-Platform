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


@app.route('/', methods=['POST'])
def submit_form():
    data = request.json
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Assuming you have a table named 'form_responses' with columns matching form fields
        query = (
            "INSERT INTO form_responses (title, firstName, lastName, institutionName, state, city, phoneNumber, email) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
        cursor.execute(query, (
        data['title'], data['firstName'], data['lastName'], data['institutionName'], data['state'], data['city'],
        data['phoneNumber'], data['email']))

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
    app.run(debug=True)
