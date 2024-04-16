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
        password="johnlou",
        database="e2e"
    )
    cursor = conn.cursor()
    
    # 示例:  (目前先放三個欄位)
    query = "INSERT INTO KOL (name, occupation, institution) VALUES (%s, %s, %s)"

    cursor.execute(query, (data['name'], data['occupation'], data['institution']))
    print(data)

    conn.commit()  # 提交事務
    cursor.close()
    conn.close()
    
    return jsonify({'status': 'success'}), 200


@app.route('/getProfile', methods=['GET'])
def get_profile():
    # Get the "name" parameter from the URL query string
    name = request.args.get('name')
    print(f"Received request for: {name}")
    # Connect to MySQL database
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="johnlou",
        database="e2e"
    )
    cursor = conn.cursor(dictionary=True)  # Use dictionary format for the results
    
    # Execute query to find the profile with the given name
    query = "SELECT name, occupation, institution FROM KOL WHERE name = %s"
    cursor.execute(query, (name,))
    result = cursor.fetchone()  # Assume there will always be a record found
    
    # Close the cursor and connection
    cursor.close()
    conn.close()
    
    # Return the found record as JSON
    return jsonify(result), 200

if __name__ == "__main__":
    app.run(debug=True)
