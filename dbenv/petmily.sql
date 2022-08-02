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
    ReservationID INT(11) AUTO_INCREMENT PRIMARY KEY,
    Customer_name VARCHAR(10),
    Customer_number VARCHAR(14),
    AnimalType VARCHAR(3),
    Symptom VARCHAR(255),
    Time BIGINT(20) unsigned,
    FOREIGN KEY(Hospital_ID) REFERENCES hospital_info(HospitalID)
);

DROP TABLE IF EXISTS symptom;
CREATE TABLE symptom(
    Symptom_code VARCHAR(15),
    Sorted_Symptom_kor VARCHAR(50),
    Symptom_code_list VARCHAR(50) PRIMARY KEY,
    Symptom_name VARCHAR(255),
    info VARCHAR(50)
);

DROP TABLE IF EXISTS disease_info;
CREATE TABLE disease_info(
	disease_code INT(11) PRIMARY KEY AUTO_INCREMENT,
    Disease_name VARCHAR(255),
    Species VARCHAR(50),
    Definition TEXT,
    Main_Symptom TEXT
);

DROP TABLE IF EXISTS gu_info;
CREATE TABLE gu_info(
    gu CHAR(10) PRIMARY KEY,
    Hospital TINYINT(3),
    Is24 TINYINT(3),
    latitude DOUBLE(28, 25),
    longitude DOUBLE(28, 25)
);

DROP TABLE IF EXISTS start_end;
CREATE TABLE start_end(
    HospitalID INT(11),
    mon_start INT(5),
    tue_start INT(5),
    wed_start INT(5),
    thu_start INT(5),
    fri_start INT(5),
    sat_start INT(5),
    sun_start INT(5),
    hol_start INT(5),
    mon_end INT(5),
    tue_end INT(5),
    wed_end INT(5),
    thu_end INT(5),
    fri_end INT(5),
    sat_end INT(5),
    sun_end INT(5),
    hol_end INT(5),
    FOREIGN KEY(HospitalID) REFERENCES hospital_info(HospitalID)
);