 # -- coding: utf-8 --
from flask import Flask, request, make_response, jsonify, Response
from datalib import Symptom_prediction_system, db_guinfo, db_readhospital, db_reservation
from datalib import mysql_reservation
from datalib import db_hospital_time
from datalib import distance
import pymysql
import urllib
import random
#db연동
ht='localhost'
pt=3306
pw='48615+'

app = Flask(__name__, static_url_path='/', static_folder='build')
#축종리스트
@app.route('/select-species',methods=['GET'])
def select_species():
    specieslist=Symptom_prediction_system.select_species()
    return jsonify(specieslist)

#카테고리리스트
@app.route('/symptomcategory',methods=['GET'])
def category():
    categorylist=Symptom_prediction_system.select_category_symptom_list()
    return jsonify(categorylist)

#증상리스트
@app.route('/symptom',methods=['GET'])
def symptom_select():
    try:
        symptom_list = Symptom_prediction_system.symptom(Symptom_prediction_system.db_connect(pw))
        return jsonify(symptom_list)
    except Exception as e:
        print(e)
        return Response("", status=500)

# #증상리스트
# @app.route('/symptom',methods=['GET'])
# def symptom_select():
#     try:
#         symptom_category_select = request.args.get('category')
#         symptom_category_select = urllib.parse.unquote(symptom_category_select)
#         symptom_list = Symptom_prediction_system.symptom(symptom_category_select,Symptom_prediction_system.db_connect(pw))
#         return jsonify(symptom_list)
#     except Exception as e:
#         print(e)
#         return Response("", status=400)

#전체검색증상리스트
@app.route('/searchsymptom', methods=['GET'])
def searchsymptom_list():
    try:
        question = request.args.get('q')      
        symptom_list = Symptom_prediction_system.search_symptom(question,Symptom_prediction_system.db_connect(pw))
        if len(symptom_list) == 0:
            return jsonify([])
        else:
            return jsonify(symptom_list)
    except:
        return Response("",status=500)

#위치(모바일GPS)정보기반 가까운 업체리스트
@app.route('/distance', methods=['POST','GET'])
def hospital_distance():
    try:
        if request.method == 'POST':
            hospital_gps = request.get_json()
            result = distance.distance_hospital(hospital_gps["latitude"],hospital_gps["longitude"],db_conn)
            return jsonify(result)
        else:
            db_conn = pymysql.connect(host=ht, port=pt, user='root', passwd=pw, db='petmily_db')
            latitude=request.args.get('latitude')
            longitude=request.args.get('longitude')
            # search_range = request.args.get('search-range')
            # search_hospital = request.args.get('search-hospital')
            result = distance.distance_hospital(latitude,longitude,db_conn)
            return jsonify(result)    
    except Exception as e:
        print(e)
        return Response("",status=500)
        

#룰베이스예측시스템
@app.route('/predict-disease',methods=['POST'])
def predict_disease():
    try:
        db_conn = pymysql.connect(host=ht, port=pt, user='root', passwd=pw, db='petmily_db')
        symptom_data = request.get_json()
        if len(symptom_data) == 0:
            return Response("", status=400)
        else:
            random.seed(42)    
            result_predict_disease = Symptom_prediction_system.disease_prediction(Symptom_prediction_system.admin_list(symptom_data['symptoms'],Symptom_prediction_system.db_connect(pw)),symptom_data['species'],Symptom_prediction_system.disease_pretreatment(db_conn))
            return jsonify(result_predict_disease)
    except Exception as e:
        print(e)
        return Response("", status=500)

#예측질병정의
@app.route('/predict-disease-definition',methods=['POST'])
def predict_disease_definition():
    try:
        db_conn = pymysql.connect(host=ht, port=pt, user='root', passwd=pw, db='petmily_db')
        disease_data = request.get_json()
        if len(disease_data) == 0:
            return Response("", status=400)
        else:    
            result_predict_disease_definition = Symptom_prediction_system.predict_disease_Definition(disease_data,Symptom_prediction_system.disease_pretreatment(db_conn))
            return jsonify(result_predict_disease_definition)
    except Exception as e:
        print(e)
        return Response("", status=500)        


#구정보 전송
@app.route('/guinfo', methods=['GET'])
def gu_info():
    db_conn = pymysql.connect(host=ht, port=pt, user='root', passwd=pw, db='petmily_db')
    gu_if = db_guinfo.db_to_flask_guinfo(db_conn)
    db_conn.close()
    return jsonify(gu_if)


#업체별 마커정보
@app.route('/markerinfo', methods=['GET'])
def res_xylist():
    db_conn = pymysql.connect(host=ht, port=pt, user='root', passwd=pw, db='petmily_db')
    x=db_readhospital.db_to_flask(db_conn)
    db_conn.close()
    return jsonify(x)

#업체별 시간정보
@app.route('/buisnesshour', methods = ['GET'])
def hospital_time():
    db_conn = pymysql.connect(host=ht, port=pt, user='root', passwd=pw, db='petmily_db')
    try:
        try: 
            hospid = request.args.get('hospitalid')
            print(hospid)            
            hosptime = db_hospital_time.db_to_flask_time(db_conn,hospid)
            db_conn.close()
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
    db_conn = pymysql.connect(host=ht, port=pt, user='root', passwd=pw, db='petmily_db')
    try:
        try: 
            hospid = request.args.get('hospitalid')            
            user_reserv = db_reservation.user_reservation(db_conn,hospid)
            db_conn.close()
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
    db_conn = pymysql.connect(host=ht, port=pt, user='root', passwd=pw, db='petmily_db')
    try:
        try: 
            hospid = request.args.get('hospitalid')            
            host_reserv = db_reservation.host_reservation(db_conn,hospid)
            db_conn.close()
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
    db_conn = pymysql.connect(host=ht, port=pt, user='root', passwd=pw, db='petmily_db')
    if request.method == 'POST':
        data = request.get_json()
        try:
            hospitalid_time = db_reservation.user_reservation(db_conn,data['HospitalID'])
            print(hospitalid_time)
            if len(hospitalid_time) < 1:
                mysql_reservation.reservation_save(data['HospitalID'],data['Customer_name'],data["Customer_number"],data['AnimalType'],data['Symptom'],data['Time'],data['AdditionalInfo'], db_conn)
                db_conn.close()
                return Response("", status=200)
            else:
                time_temp=[]
                for i in hospitalid_time:
                    time_temp.append(i)
                if data['Time'] not in time_temp:
                    mysql_reservation.reservation_save(data['HospitalID'],data['Customer_name'],data["Customer_number"],data['AnimalType'],data['Symptom'],data['Time'],data['AdditionalInfo'], db_conn)
                    db_conn.close()
                    return Response("", status=200)      
                else:
                    return Response("",status=400)

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