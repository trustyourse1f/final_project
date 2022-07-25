from re import A
import pandas as pd
import pymysql
db_conn = pymysql.connect(host='localhost', port=3306, user='root', passwd='48615+', db='petmily_db')
def db_connect(pw):
    db = pymysql.connect(host='localhost', port=3306, user='root', passwd=f'{pw}', db='petmily_db', charset='utf8')
    query = "SELECT * FROM symptom"
    result=[]
    c1=db.cursor()
    c1.execute(query)
    for row in c1:
        j_dict = {"Symptom_code":row[0],
                "Sorted_Symptom_kor":row[1],
                "Sorted_Symptom_eng":row[2],
                "Symptom_code_list":row[3],
                "Symptom_name":row[4],
                "info":row[5],
                 }        
        result.append(j_dict)
    
    return result 
# 전처리함수화
def disease_pretreatment(db):
    query = 'SELECT * FROM disease_info'
    df = pd.read_sql(query,db)
    Symptom_=[]
    for i in df['Main_Symptom']:
        l=[]
        a=i.replace("|",",").lstrip(" ,").split(",")
        
        try:
            a.remove(' \r')
            try:
                a.remove(" ")
                for j in a:
                    x=j.strip().replace(" ","").replace("\r","")
                    if x not in l:
                        l.append(x)
                Symptom_.append(l)
            except:
                a.remove(" ")
                for j in a:
                    x=j.strip().replace(" ","").replace("\r","")
                    if x not in l:
                        l.append(x)
                Symptom_.append(l)
        except:
            try:
                a.remove(' \r')
                for j in a:
                    x=j.strip().replace(" ","").replace("\r","")
                    if x not in l:
                        l.append(x)
                Symptom_.append(l)
            except:
                for j in a:
                    x=j.strip().replace(" ","").replace("\r","")
                    if x not in l:
                        l.append(x)
                Symptom_.append(l)     
    df['Main_Symptom']=Symptom_
    return df
# 축종선택
def select_species():
    select_specieslist=['강아지','고양이']
    return select_specieslist
#카테고리선택
def select_category_symptom_list():
    category_list=['청각기관 증상','심혈관계 증상','소화기계','안과 증상','전신종합 증상','근골격계','신경계 증상','통증 증상','호흡기계 증상','피부/외피계 증상','생식기계 증상','비뇨기계 증상','비뇨기계 증상']
    return category_list
#증상선택
def symptom(category_select,db):
    Symptom_list=[]
    info_list=[]
    index=-1
    for i in db:
        index+=1
        if category_select == i['Sorted_Symptom_kor']:
            if i['Symptom_name'] not in Symptom_list:
                Symptom_list.append(i['Symptom_name'])
                info_list.append(db[index]['info'])
    return info_list,Symptom_list
#관리자리스트선택목록,사용자선택목록 저장
def symptom_selected(Symptom_select,info_list,Symptom_list):  
    admin_select_list=[]
    user_check_list=[]
    info_index=-1
    for i in info_list:
        info_index+=1
        if i == Symptom_select:
            break
    admin_select_list.append(Symptom_list[info_index])#전문용어
    if Symptom_select in info_list:
        user_check_list.append(Symptom_select)#쉬운용어
    return Symptom_select,Symptom_list[info_index]

#admin 전처리
def admin_list(admin_select_list):
    admin=[]
    for i in admin_select_list:
        if "," in i:
            a=i.split(',')
            for j in a:
                j=j.strip().replace(" ","")
                admin.append(j)
        else:
            admin.append(i)
    return admin
#증상예측
def disease_prediction(admin_select_list,select_species,disease_pretreatment):
    df=disease_pretreatment
    index_number_dict={}
    index_number=0
    if select_species == '강아지':
        df_dog = df[(df.species == '개') | (df.species == '개, 고양이')].reset_index(drop=True)
        for index in df_dog['Main_Symptom']:
            index_number+=1
            count=0
            for Symptom in index:
                if Symptom in admin_select_list:
                    count+=1
            index_number_dict[df_dog["Disease_name"][index_number-1]]=count
        result = dict(sorted(index_number_dict.items(), key=lambda x: x[1], reverse=True)) 
        num=0
        for i,j in result.items():
            num+=1
            if j != 0:
                result_list.append(i)
            if num == 5:
                break
        return result_list
        
    elif select_species == '고양이':
        df_cat = df[(df.Species == '고양이') | (df.Species == '개, 고양이')].reset_index(drop=True)
        for index in df_cat['Main_Symptom']:
            index_number+=1
            count=0
            for Symptom in index:
                if Symptom in admin_select_list:
                    count+=1
            index_number_dict[df_cat["Disease_name"][index_number-1]]=count
        result = dict(sorted(index_number_dict.items(), key=lambda x: x[1], reverse=True))
        result_list=[]
        num=0
        for i,j in result.items():
            num+=1
            if j != 0:
                result_list.append(i)
            if num == 5:
                break
        return result_list
# print(symptom('생식기계 증상',db_connect('48615+'))[1])
# print([symptom_selected('포피가 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('포경',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('음경이 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('발기가 풀리지 않아요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1]])
a=[symptom_selected('포피가 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('포경',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('음경이 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('발기가 풀리지 않아요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1]]
# print(admin_list(a))
print(disease_prediction(admin_list(a),'고양이',disease_pretreatment(db_conn)))

# [symptom_selected('포피가 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('포경',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('음경이 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('발기가 풀리지 않아요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1]]