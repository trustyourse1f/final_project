import pandas as pd
import os

def gethos():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    df = pd.read_csv(f'{dir_path}/exampledata/petraschu.csv')
    return df

def getlist():
    df = gethos()
    result=[{"name":df["name"][i],
            "latitude":df["latitude"][i],
            "longitude":df["longitude"][i],
            "contract":df["contract"][i],
            "address":df["address"][i],
            "is24":int(df["is24"][i]),
            "isBeautyParlor":int(df["isBeautyParlor"][i]),
            "isHotel":int(df["isHotel"][i]),
            "isStore":int(df["isStore"][i]),
            "hasParkingLot":int(df["hasParkingLot"][i])} for i in df['name'].index]    
    return result


if __name__ == '__main__':
    df = getlist()
    print(df)