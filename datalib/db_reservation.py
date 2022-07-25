import pymysql
import pandas as pd


def user_reservation(db,hospiID):
    query = f'SELECT * FROM reservation WHERE Hospital_ID = "{hospiID}"'
    result=[]
    c1=db.cursor()
    c1.execute(query)
    for row in c1:
        j_dict = {
            "Time":row[6]
                }
        result.append(j_dict)
    return result

def host_reservation(db,hospiID):
    query = f'SELECT * FROM reservation WHERE Hospital_ID = "{hospiID}"'
    result=[]
    c1=db.cursor()
    c1.execute(query)
    for row in c1:
        j_dict = {
            "Customer_name":row[2],
            "Customer_number":row[3],
            "AnimalType":row[4],
            "Symptom":row[5],
            "Time":row[6]
                }
        result.append(j_dict)
    return result