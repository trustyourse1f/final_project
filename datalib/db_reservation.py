import pymysql
import pandas as pd

def user_reservation(db,hospiID):
    query = f'SELECT * FROM reservation WHERE HospitalID = "{hospiID}"'
    result=[]
    c1=db.cursor()
    c1.execute(query)
    for row in c1:
        j_dict = {
            "Time":row[5]
                }
        result.append(j_dict)
    return result

def host_reservation(db,hospiID):
    query = f'SELECT * FROM reservation WHERE HospitalID = "{hospiID}"'
    result=[]
    c1=db.cursor()
    c1.execute(query)
    for row in c1:
        j_dict = {
            "Customer_name":row[1],
            "Customer_number":row[2],
            "AnimalType":row[3],
            "Symptom":row[4],
            "Time":row[5]
                }
        result.append(j_dict)
    return result