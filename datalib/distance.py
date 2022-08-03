import pymysql

def distance_hospital(latitude,longitude,db):
    result_list=[]
    query = f'SELECT HospitalID,(6371 * acos ( cos ( radians("{latitude}")) * cos( radians( latitude ) )* cos( radians( longitude) - radians("{longitude}"))+ sin ( radians("{latitude}") ) * sin( radians( latitude ) ))) AS distance FROM hospital_info HAVING distance < 10 ORDER BY distance LIMIT 0,5'
    c1=db.cursor()
    c1.execute(query)
    for i in c1:
        result_dict={
            "HospitalID":i[0],
            "ditance":i[1]
        }
        result_list.append(result_dict)
    return(result_list)
