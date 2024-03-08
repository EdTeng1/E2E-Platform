from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
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
            "SELECT k.id AS kol_id, k.name, k.email, k.gender, k.age, k.location, k.occupation,"
               "kp.id AS profile_id, kp.title, kp.first_name, kp.last_name, kp.pronouns,"
               "kp.institute, kp.state, kp.city, kp.zip_code, kp.phone_number, kp.email AS profile_email,"
               "e.id AS engagement_id, e.engagement_type, e.function, e.notes,"
               "e.follow_up_requested, e.information_requested"
            "FROM KOL k"
            "LEFT JOIN KOLProfile kp ON k.id = kp.kol_id"
            "LEFT JOIN Engagement e ON kp.id = e.kol_id"
        )
        cursor.execute(query)
        rows = cursor.fetchall()
        kols_data = {}
        for row in rows:
            kol_id = row['kol_id']
            if kol_id not in kols_data:
                kols_data[kol_id] = {
                    'id': kol_id,
                    'name': row['name'],
                    'email': row['email'],
                    'gender': row['gender'],
                    'age': row['age'],
                    'location': row['location'],
                    'occupation': row['occupation'],
                    'profile': {
                        'id': row['profile_id'],
                        'title': row['title'],
                        'first_name': row['first_name'],
                        'last_name': row['last_name'],
                        'pronouns': row['pronouns'],
                        'institute': row['institute'],
                        'state': row['state'],
                        'city': row['city'],
                        'zip_code': row['zip_code'],
                        'phone_number': row['phone_number'],
                        'email': row['profile_email']
                    },
                    'engagements': []
                }
            