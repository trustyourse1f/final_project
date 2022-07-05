import pandas as pd

__petasn_df = None # 반려동물 판매업체 데이터프레임

def getdataframe():
    # __petfac_df에 api로 받아온 데이터를 저장하는 함수
    __petasn_df = pd.DataFrame(['판매업체', 200, 300])


if __name__=='__main__':
    getdataframe()
    print(__petasn_df.head())
    print(__petasn_df.tail())