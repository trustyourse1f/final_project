DROP DATABASE IF EXISTS petmily_db;
CREATE DATABASE petmily_db default CHARACTER SET UTF8;
USE petmily_db;
DROP TABLE IF EXISTS hospital_info;
CREATE TABLE hospital_info(
    HospitalID INT(11) PRIMARY KEY,
    name VARCHAR(255),
    contract VARCHAR(12),
    is24 TINYINT(1),
    isBeautyParlor TINYINT(1),
    isHotel TINYINT(1),
    isStore TINYINT(1),
    hasParkingLot TINYINT(1),
    businessHours VARCHAR(255),
    latitude DOUBLE(28, 25),
    longitude DOUBLE(28, 25),
    address VARCHAR(255),
    subject VARCHAR(255),
    species VARCHAR(255)
);

DROP TABLE IF EXISTS reservation;
CREATE TABLE reservation(
    Hospital_ID INT(11),
    Customer_name VARCHAR(10),
    Customer_number VARCHAR(14),
    AnimalType VARCHAR(3),
    Symptom VARCHAR(255),
    Time VARCHAR(255),
    FOREIGN KEY(Hospital_ID) REFERENCES hospital_info(HospitalID)
);

DROP TABLE IF EXISTS symptom;
CREATE TABLE symptom(
    Symptom_code VARCHAR(15),
    Sorted_Symptom_kor VARCHAR(255),
    Sorted_Symptom_eng VARCHAR(255),
    Symptom_code_list VARCHAR(255),
    Symptom_name VARCHAR(255),
    info VARCHAR(255)
);

DROP TABLE IF EXISTS disease_info;
CREATE TABLE disease_info(
    Disease_name VARCHAR(255),
    Species VARCHAR(255),
    Definition TEXT,
    Main_Symptom TEXT
);

DROP TABLE IF EXISTS gu_info;
CREATE TABLE gu_info(
    gu CHAR(10),
    Hospital TINYINT(3),
    Is24 TINYINT(3)
);

DROP TABLE IF EXISTS start_end;
CREATE TABLE start_end(
    HospitalID INT(11) PRIMARY KEY,
    name CHAR(50),
    mon_start CHAR(50),
    tue_start CHAR(50),
    wed_start CHAR(50),
    thu_start CHAR(50),
    fri_start CHAR(50),
    sat_start CHAR(50),
    sun_start CHAR(50),
    hol_start CHAR(50),
    mon_end CHAR(50),
    tue_end CHAR(50),
    wed_end CHAR(50),
    thu_end CHAR(50),
    fri_end CHAR(50),
    sat_end CHAR(50),
    sun_end CHAR(50),
    hol_end CHAR(50),
    businessHours CHAR(255),
    FOREIGN KEY(HospitalID) REFERENCES hospital_info(HospitalID)
);