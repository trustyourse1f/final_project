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
        latitude DOUBLE(28, 25),
        longitude DOUBLE(28, 25),
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
        Time CHAR(5),
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
        Hospital TINYINT(15),
        Is24 TINYINT(15)
);

DROP TABLE IF EXISTS start_end;
CREATE TABLE start_end(
		name VARCHAR(255),
        mon_start VARCHAR(255),
        tue_start VARCHAR(255),
        wed_start VARCHAR(255),
        thu_start VARCHAR(255),
        fri_start VARCHAR(255),
        sat_start VARCHAR(255),
        sun_start VARCHAR(255),
        hol_start VARCHAR(255),
        mon_end VARCHAR(255),
        tue_end VARCHAR(255),
        wed_end VARCHAR(255),
        thu_end VARCHAR(255),
        fri_end VARCHAR(255),
        sat_end VARCHAR(255),
        sun_end VARCHAR(255),
        hol_end VARCHAR(255),
        businessHours VARCHAR(255)
);