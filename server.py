from flask import Flask, request, make_response, jsonify, Response
import os
from datalib import db_guinfo, db_readhospital, db_reservation
from datalib import mysql_reservation
from datalib import db_hospital_time
import pymysql
#db연동
db_conn = pymysql.connect(host='localhost', port=3306, user='root', passwd='48615+', db='petmily_db')
app = Flask(__name__, static_url_path='/', static_folder='build')

#구정보 전송
@app.route('/guinfo', methods=['GET'])
def gu_info():
    gu_if = db_guinfo.db_to_flask_guinfo(db_conn)
    return jsonify(gu_if)


#업체별 마커정보
@app.route('/markerinfo', methods=['GET'])
def res_xylist():
    x=db_readhospital.db_to_flask(db_conn)
    return jsonify(x)

#업체별 시간정보
@app.route('/buisnesshour', methods = ['GET'])
def hospital_time():
    try:
        try: 
            hospid = request.args.get('hospitalid')            
            hosptime = db_hospital_time.db_to_flask_time(db_conn,hospid)
            return jsonify(hosptime)
        except Exception as e:
            print(e)
            return Response("", status=400)
    except Exception as e:
        print(e)
        return Response("", status=500)

#고객예약정보(시간) 클라이언트로
@app.route('/reserveinfo', methods = ['GET'])
def reserve_info_user():
    try:
        try: 
            hospid = request.args.get('hospitalid')            
            user_reserv = db_reservation.user_reservation(db_conn,hospid)
            return jsonify(user_reserv)
        except Exception as e:
            print(e)
            return Response("", status=400)
    except Exception as e:
        print(e)
        return Response("", status=500)

#고객예약정보(병원) 클라이언트로
@app.route('/reserveinfo/host', methods = ['GET'])
def reserve_info_host():
    try:
        try: 
            hospid = request.args.get('hospitalid')            
            host_reserv = db_reservation.host_reservation(db_conn,hospid)
            return jsonify(host_reserv)
        except Exception as e:
            print(e)
            return Response("", status=400)
    except Exception as e:
        print(e)
        return Response("", status=500)

#고객예약정보 서버로
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

#메인홈
@app.route('/')
def index_html(): # 루트에서는 index.html을 response로 보냄
     return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):  # SPA 이므로 404 에러는 index.html을 보냄으로써 해결한다.
    return index_html()


if __name__ == '__main__':
    app.run(debug=True)