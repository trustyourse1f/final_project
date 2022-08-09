import pymysql

def distance_hospital(latitude,longitude,db):
    
    query = f'SELECT HospitalID,name,latitude,longitude,(6371 * acos ( cos ( radians("{latitude}")) * cos( radians( latitude ) )* cos( radians( longitude) - radians("{longitude}"))+ sin ( radians("{latitude}") ) * sin( radians( latitude ) ))) AS distance FROM hospital_info WHERE is24>=1 ORDER BY distance LIMIT 0,1'
    c1=db.cursor()
    c1.execute(query)
    for i in c1:
        result_dict={
            "HospitalID":i[0],
            "name":i[1],
	        "latitude":i[2],
	        "longitude":i[3],
            "ditance":i[4]
        }
        result = result_dict
    return result
