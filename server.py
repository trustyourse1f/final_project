from flask import Flask, request, make_response, jsonify, Response
import os
from datalib import db_readhospital
from datalib import mysql_reservation
import pymysql

db_conn = pymysql.connect(host='', port=3306, user='root', passwd='', db='petmily_db')

app = Flask(__name__, static_url_path='/', static_folder='build')

@app.route('/markerinfo', methods=['GET'])
def res_xylist():
    x=db_readhospital.db_to_flask(db_conn)
    return jsonify(x)

@app.route('/reserve', methods=['POST'])
def insert_data():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        try:
            mysql_reservation.reservation_save(data['HospitalID'],data['Customer_name'],data["Customer_number"],data['AnimalType'],data['Symptom'],data['Time'], db_conn)
            return Response("", status=200)
        except Exception as e:
            print(e)
            return Response("", status=500)
    else:
        return Response("",400)


@app.route('/')
def index_html(): # 루트에서는 index.html을 response로 보냄
     return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):  # SPA 이므로 404 에러는 index.html을 보냄으로써 해결한다.
    return index_html()



if __name__ == '__main__':
    app.run(debug=True)