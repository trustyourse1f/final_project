import pymysql

def db_to_flask_time(db,hospiID):
    query = f'SELECT * FROM start_end WHERE HospitalID = "{hospiID}"'
    c1=db.cursor()
    c1.execute(query)
    for row in c1:
        j_dict = {
                "mon_start":row[1],
                "tue_start":row[2],
                "wed_start":row[3],
                "thu_start":row[4],
                "fri_start":row[5],
                "sat_start":row[6],
                "sun_start":row[7],
                "hol_start":row[8],
                "mon_end":row[9],
                "tue_end":row[10],
                "wed_end":row[11],
                "thu_end":row[12],
                "fri_end":row[13],
                "sat_end":row[14],
                "sun_end":row[15],
                "hol_end":row[16]
                }
        result = j_dict
    return result

# def hosp_id(db):
#     query = "SELECT * FROM start_end"
#     result=[]
#     c1=db.cursor()
#     c1.execute(query)
#     for row in c1:
#         j_dict = {
#             "name":row[0]
#         }
#         result.append(j_dict)
#     return result