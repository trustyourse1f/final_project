import pandas as pd
import os

def gethos():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    df = pd.read_csv(f'{dir_path}/exampledata/example0.csv')
    return df

def getxylist():
    df = gethos()
    return df.loc[:,['좌표정보(X)','좌표정보(Y)']].to_numpy()


if __name__ == '__main__':
    df = getxylist()
    print(df)