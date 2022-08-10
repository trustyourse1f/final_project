import pymysql
import pandas as pd


def user_reservation(db,hospiID):
    query = f'SELECT * FROM reservation WHERE Hospital_ID = "{hospiID}"'
    result=[]
    c1=db.cursor()
    c1.execute(query)
    for row in c1:
        result.append(row[6])
    return result

def host_reservation(db,hospiID):
    query = f'SELECT * FROM reservation WHERE Hospital_ID = "{hospiID}"'
    query1 = f'SELECT name FROM hospital_info WHERE HospitalID = "{hospiID}"'
    result=[]
    c1=db.cursor()
    c1.execute(query)
    c2=db.cursor()
    c2.execute(query1)
    for row in c1:
        j_dict = {
            "Customer_name":row[2],
            "Customer_number":row[3],
            "AnimalType":row[4],
            "Symptom":row[5],
            "Time":row[6]
                }
        result.append(j_dict)
    for i in c2:
        result_dict = {
            'name':i,
            'reservations':result
        }
    
    return result_dict