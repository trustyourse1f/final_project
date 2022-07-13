from flask import Flask, request, make_response, jsonify
import os
from datalib import readhospital

app = Flask(__name__, static_url_path='/', static_folder='build')

@app.route('/markerinfo', methods=['GET'])
def res_xylist():
    x=readhospital.getlist()
    return jsonify(x)



@app.route('/')
def index_html(): # 루트에서는 index.html을 response로 보냄
     return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):  # SPA 이므로 404 에러는 index.html을 보냄으로써 해결한다.
    return index_html()

if __name__ == '__main__':
    app.run(debug=True)