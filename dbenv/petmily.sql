DROP DATABASE IF EXISTS petmily_db;
CREATE DATABASE petmily_db default CHARACTER SET UTF8;
USE petmily_db;
DROP TABLE IF EXISTS hospital_info;
CREATE TABLE hospital_info(
		HospitalID INT(11) PRIMARY KEY,
		name VARCHAR(255),
		contract VARCHAR(255),
        is24 TINYINT(1),
        isBeautyParlor TINYINT(1),
		isHotel TINYINT(1),
        isStore TINYINT(1),
        hasParkingLot TINYINT(1),
        businessHours VARCHAR(255),
        latitude FLOAT(15),
        longitude FLOAT(15),
        address VARCHAR(255),
        subject VARCHAR(255),
        species VARCHAR(255)
);

DROP TABLE IF EXISTS reservation;
CREATE TABLE reservation(
		Hospital_ID INT(11),
        Customer_name VARCHAR(255),
        Customer_number VARCHAR(255),
        AnimalType VARCHAR(31),
        Symptom VARCHAR(255),
        Time TIMESTAMP,
        FOREIGN KEY(Hospital_ID) REFERENCES hospital_info(HospitalID)
);

DROP TABLE IF EXISTS symptom;
CREATE TABLE symptom(
		Symptom_code VARCHAR(15),
        Sorted_Symptom_kor VARCHAR(255),
        Sorted_Symptom_eng VARCHAR(255),
        Symptom_code_list VARCHAR(255),
        Symptom_name VARCHAR(255)
);

DROP TABLE IF EXISTS disease_info;
CREATE TABLE disease_info(
		Disease_name VARCHAR(255),
        Species VARCHAR(255),
		Definition VARCHAR(255),
        Main_Symptom VARCHAR(1024)
);

DROP TABLE IF EXISTS gu_info;
CREATE TABLE gu_info(
		gu VARCHAR(125),
        hospital_number TINYINT(15),
        hospital_number_is24 TINYINT(15)
);