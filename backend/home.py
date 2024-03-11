from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/', methods=['POST'])
def search():
    data = request.json  # This assumes the incoming request body is JSON
    search_query = data.get('query')
    # Process your search query here and return a response
    return jsonify({'message': f'Search for {search_query} received!'})

if __name__ == '__main__':
    app.run(debug=True)
