import pandas as pd
import pymysql
def db_connect(pw):
    db = pymysql.connect(host='localhost', port=3306, user='root', passwd=f'{pw}', db='petmily_db', charset='utf8')
    query = "SELECT * FROM symptom"
    result=[]
    c1=db.cursor()
    c1.execute(query)
    for row in c1:
        j_dict = {"Symptom_code":row[0],
                "Sorted_Symptom_kor":row[1],
                "Symptom_code_list":row[2],
                "Symptom_name":row[3],
                "info":row[4],
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
    category_list=['가슴/배', '귀', '꼬리', '눈', '다리/발/발톱', '등/허리', '머리', '목', '배변/배뇨', '생식기', '소화불량', '심장', '일반 증상', '입/턱/치아', '털/피부', '행동', '호흡기계 증상']
    return category_list

#증상선택
def symptom(db):
    result_list=[]
    temp=[]
    index=-1
    name_list=['가슴/배', '귀', '꼬리', '눈', '다리/발/발톱', '등/허리', '머리', '목', '배변/배뇨', '생식기', '소화불량', '심장', '일반 증상', '입/턱/치아', '털/피부', '행동', '호흡기계 증상']
    for i in name_list:
        temp_list=[]
        for _ in range(60):
            if index < 404:
                if i == db[index+1]["Sorted_Symptom_kor"]:
                    index+=1
                    temp_dict={
                        'code':db[index]["Symptom_code_list"],
                        'info':db[index]["info"]
                    }
                    temp_list.append(temp_dict)
        result_dict={
        'category':i,
        'symptoms':temp_list
        }
        result_list.append(result_dict)
    return result_list

# #증상선택
# def symptom(category_select,db):
#     Symptom_code_list=[]
#     info_list=[]
#     index=-1
#     for i in db:
#         index+=1
#         if category_select == i['Sorted_Symptom_kor']:
#             if i['Symptom_code_list'] not in Symptom_code_list:
#                 Symptom_code_list.append(i['Symptom_code_list'])
#                 info_list.append(db[index]['info'])
#     result_list=[]
#     for j in range(len(info_list)):
#         result_dict={
#             'code':Symptom_code_list[j],
#             'info':info_list[j]
#             }
#         result_list.append(result_dict)
#     return result_list

# 전체검색증상리스트
def search_symptom(q,db):
    Symptom_code_list=[]
    info_list=[]
    index=-1
    for i in db:
        index+=1
        if i['Symptom_code_list'] not in Symptom_code_list:
            Symptom_code_list.append(i['Symptom_code_list'])
            info_list.append(db[index]['info'])
    result_list=[]
    for j in range(len(info_list)):
        if q not in info_list[j]:
            continue
        else:
            result_dict={
                'code':Symptom_code_list[j],
                'info':info_list[j]
                }
        result_list.append(result_dict)            
    return result_list


# 검색증상리스트
# def search_symptom(category_select,q,db):
#     Symptom_code_list=[]
#     info_list=[]
#     index=-1
#     for i in db:
#         index+=1
#         if category_select == i['Sorted_Symptom_kor']:
#             if i['Symptom_code_list'] not in Symptom_code_list:
#                 Symptom_code_list.append(i['Symptom_code_list'])
#                 info_list.append(db[index]['info'])
#     result_list=[]
#     for j in range(len(info_list)):
#         if q not in info_list[j]:
#             continue
#         else:
#             result_dict={
#                 'code':Symptom_code_list[j],
#                 'info':info_list[j]
#                 }
#         result_list.append(result_dict)            
#     return result_list


#관리자리스트선택목록,사용자선택목록 저장
# def symptom_selected(Symptom_select,info_list,Symptom_list):  
#     admin_select_list=[]
#     user_check_list=[]
#     info_index=-1
#     for i in info_list:
#         info_index+=1
#         if i == Symptom_select:
#             break
#     admin_select_list.append(Symptom_list[info_index])#전문용어
#     if Symptom_select in info_list:
#         user_check_list.append(Symptom_select)#쉬운용어
#     return Symptom_select,Symptom_list[info_index]

#admin 전처리
def admin_list(admin_select_list,db):
    admin=[]
    symptom_name=[]
    for i in db:
        for j in admin_select_list:
            if j == i['Symptom_code_list']:
                if i['Symptom_name'] not in admin:
                    admin.append(i['Symptom_name'])
    for i in admin:
        if "," in i:
            a=i.split(',')
            for j in a:
                j=j.strip().replace(" ","")
                symptom_name.append(j)
        else:
            k=i.replace(" ","")
            symptom_name.append(k)
    return symptom_name
#증상예측
def disease_prediction(admin_select_list,select_species,disease_pretreatment):
    df=disease_pretreatment
    index_number_dict={}
    index_number=0
    if select_species == '강아지':
        df_dog = df[(df.Species == '개') | (df.Species == '개, 고양이')].reset_index(drop=True)
        for index in df_dog['Main_Symptom']:
            index_number+=1
            count=0
            for Symptom in index:
                if Symptom in admin_select_list:
                    count+=1
            index_number_dict[df_dog["Disease_name"][index_number-1]]=count
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

def predict_disease_Definition(diseaselist,disease_pretreatment):
    result_list = []
    disease_df = disease_pretreatment
    for i in diseaselist:
        if i in disease_df['Disease_name']:
            disease_info = disease_df[disease_df['Disease_name']==i].iloc
            disease_definition = disease_info[0]["Definition"]
            result_dict={
                "disease_name":i,
                "disease_definition":disease_definition
            }
            result_list.append(result_dict)
    return result_list


# if __name__ == '__main__':
#     print(admin_list(['c025','c030','c035','c040'],db_connect('48615+')))

# print(symptom('생식기계 증상',db_connect('48615+'))[1])
# print([symptom_selected('포피가 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('포경',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('음경이 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('발기가 풀리지 않아요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1]])
# a=[symptom_selected('포피가 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('포경',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('음경이 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('발기가 풀리지 않아요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1]]
# print(admin_list(['c025','c030','c035','c040'],db_connect('48615+')))
# print(disease_prediction(admin_list(a),'고양이',disease_pretreatment(db_conn)))
# print(symptom('생식기계 증상',db_connect('48615+')))
# [symptom_selected('포피가 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('포경',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('음경이 뜨거워요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1],symptom_selected('발기가 풀리지 않아요',symptom('생식기계 증상',db_connect('48615+'))[0],symptom('생식기계 증상',db_connect('48615+'))[1])[1]]

