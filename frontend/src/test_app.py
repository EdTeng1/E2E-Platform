# app.py (Flask 应用)
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # 跨域請求

@app.route('/updateProfile', methods=['POST'])
def update_profile():
    data = request.json  # JSON格式的請求數據
    # 連接MySQL
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="yourpassword",
        database="youpdatabasename"
    )
    cursor = conn.cursor()
    
    # 示例:  (目前先放三個欄位)
    query = "INSERT INTO users (name, occupation, institution) VALUES (%s, %s, %s)"

    cursor.execute(query, (data['name'], data['occupation'], data['institution']))
    
    conn.commit()  # 提交事務
    cursor.close()
    conn.close()
    
    return jsonify({'status': 'success'}), 200

if __name__ == "__main__":
    app.run(debug=True)
