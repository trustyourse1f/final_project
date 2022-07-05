import pandas as pd

__petfac_df = None # 반려동물 판매업체 데이터프레임

def getdataframe():
    # __petfac_df에 api로 받아온 데이터를 저장하는 함수
    __petfac_df = pd.DataFrame(['판매업체', 200, 300])


if __name__=='__main__':
    getdataframe()
    print(__petfac_df.head())
    print(__petfac_df.tail())