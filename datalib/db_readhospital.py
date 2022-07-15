import pymysql
import pandas as pd
def db_to_flask(pw,dbname):
    db = pymysql.connect(host='localhost', port=3306, user='root', passwd=f'{pw}', db=f'{dbname}', charset='utf8')
    query = "SELECT * FROM hospital_info"
    result=[]
    c1=db.cursor()
    c1.execute(query)
    for row in c1:
        j_dict = {"HospitalID":row[0],
                "name":row[1],
                "contract":row[2],
                "is24":row[3],
                "isBeautyParlor":row[4],
                "isHotel":row[5],
                "isStore":row[6],
                "hasParkingLot":row[7],
                "businessHours":row[8],
                "latitude":row[9],
                "longitude":row[10],
                "address":row[11],
                "subject":row[12],
                "species":row[13]
                }
        result.append(j_dict)
    return result


    