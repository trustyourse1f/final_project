import pandas as pd
import os

def gethos():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    df = pd.read_csv(f'{dir_path}/exampledata/example1.csv')
    return df

def getxylist():
    df = gethos()
    result=[{"title":df["사업장명"][i],"x":df["좌표정보(X)"][i],"y":df["좌표정보(Y)"][i]} for i in range(len(df["사업장명"]))]    
    return result


if __name__ == '__main__':
    df = getxylist()
    print(df)