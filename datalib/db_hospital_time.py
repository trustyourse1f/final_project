import pymysql

def db_to_flask_time(db,hospiID):
    query = f'SELECT * FROM start_end WHERE HospitalID = "{hospiID}"'
    c1=db.cursor()
    c1.execute(query)
    for row in c1:
        j_dict = {
                "mon":f'{row[1]}~{row[9]}',
                "tue":f'{row[2]}~{row[10]}',
                "wed":f'{row[3]}~{row[11]}',
                "thu":f'{row[4]}~{row[12]}',
                "fri":f'{row[5]}~{row[13]}',
                "sat":f'{row[6]}~{row[14]}',
                "sun":f'{row[7]}~{row[15]}',
                "hol":f'{row[8]}~{row[16]}'
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