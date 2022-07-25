import pymysql
def db_to_flask_guinfo(db):
    result=[]
    query = "SELECT * FROM gu_info"
    c1=db.cursor()
    c1.execute(query)
    for row in c1:
        j_dict = {
                "name":row[0],
                "total":row[1],
                "Is24":row[2],
                "latitude":row[3],
                "longitude":row[4]
                }
        result.append(j_dict)
    return result