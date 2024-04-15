from flask import Flask, request, jsonify
import mysql.connector
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)

# DB connection details
db_config = {
    'host': '',
    'user': '',
    'password': '',
    'database': ''
}

@app.route('/profile', methods = ['POST', 'GET'])
def kol_info():
    data = request.json
    print(data)
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        query = (
            "SELECt * FROM kol_profile"
        )
        cursor.execute(query)
        res = cursor.fetchall()
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({'message': 'Failed to submit form'}), 500
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

            