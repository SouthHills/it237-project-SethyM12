CREATE TABLE PLANT (
PLANT_ID int NOT NULL PRIMARY KEY,
PLANT_NAME varchar(32) NOT NULL,
PLANT_CITY varchar(32) NOT NULL,
PLANT_STATE char(2) NOT NULL
);

CREATE TABLE VENDOR (
VENDOR_ID int NOT NULL PRIMARY KEY,
VENDOR_NAME varchar(32) NOT NULL,
VENDOR_CITY varchar(32) NOT NULL,
VENDOR_STATE char(2) NOT NULL
);

CREATE TABLE [USER] (
USER_ID int NOT NULL PRIMARY KEY,
USER_FNAME varchar(32) NOT NULL,
USER_LNAME varchar(32) NOT NULL,
USER_EMAIL varchar(64),
USER_ROLE_MANAGER BIT NOT NULL, --0=false, 1=true
PLANT_ID int NOT NULL,
FOREIGN KEY (PLANT_ID) REFERENCES [dbo].[PLANT](PLANT_ID)
);

CREATE TABLE COMPONENT (
COMP_ID int NOT NULL PRIMARY KEY, 
COMP_NAME varchar(32) NOT NULL,
COMP_QTY int NOT NULL,
COMP_SPECS varchar(32) NOT NULL,
PLANT_ID int NOT NULL,
FOREIGN KEY (PLANT_ID) REFERENCES [dbo].[PLANT](PLANT_ID)
);

CREATE TABLE PART (
PART_ID int NOT NULL PRIMARY KEY,
PART_NAME varchar(64) NOT NULL,
PART_QTY int NOT NULL,
PART_SPECS varchar(32) NOT NULL,
COMP_ID int,
VENDOR_ID int,
FOREIGN KEY (COMP_ID) REFERENCES [dbo].[COMPONENT](COMP_ID),
FOREIGN KEY (VENDOR_ID) REFERENCES [dbo].[VENDOR](VENDOR_ID)
);

INSERT INTO PLANT (PLANT_ID, PLANT_NAME, PLANT_CITY, PLANT_STATE)
VALUES 
    (100, 'TSMC Arizona Fab 21', 'Phoenix', 'AZ'),
    (101, 'Intel Chandler Fab 52', 'Chandler', 'AZ'),
    (102, 'Samsung Taylor Foundry', 'Taylor', 'TX'),
    (103, 'Micron Clay Megafab', 'Clay', 'NY'),
    (104, 'GlobalFoundries Malta Fab 8', 'Malta', 'NY');

INSERT INTO VENDOR (VENDOR_ID, VENDOR_NAME, VENDOR_CITY, VENDOR_STATE)
VALUES
    (1001, 'DigiKey Electronics', 'Thief River Falls', 'MN'),
    (1002, 'Mouser Electronics', 'Mansfield', 'TX'),
    (1003, 'Arrow Electronics', 'Centennial', 'CO'),
    (1004, 'Avnet', 'Phoenix', 'AZ'),
    (1005, 'Future Electronics', 'Montreal', 'QC');

INSERT INTO [USER] (USER_ID, USER_FNAME, USER_LNAME, USER_EMAIL, USER_ROLE_MANAGER, PLANT_ID)
VALUES 
    (200, 'Michael', 'Thompson', 'm.thompson@facility.com', 0, 102),
    (201, 'Jennifer', 'Walker', 'j.walker@company.com', 1, 100),
    (202, 'David', 'Martinez', NULL, 0, 104),
    (203, 'Rachel', 'Bennett', 'r.bennett@site.org', 1, 103),
    (204, 'Kevin', 'Nguyen', 'k.nguyen@plant.org', 0, 101);

INSERT INTO [COMPONENT] (COMP_ID, COMP_NAME, COMP_QTY, COMP_SPECS, PLANT_ID) 
VALUES 
    (300, 'Ball Bearing 6204ZZ', 450, 'Shielded, 20x47x14mm', 103),
    (301, 'Timing Belt GT2 6mm', 280, '2mm pitch, 6mm width', 101),
    (302, 'Solenoid Valve 1/4"', 75, '24V DC, normally closed', 104),
    (303, 'Inductive Proximity Sensor', 130, 'M18, NPN, 8mm range', 100),
    (304, 'Chain Link #50', 920, 'Pitch 5/8", roller chain', 102);

INSERT INTO [PART] (PART_ID, PART_NAME, PART_QTY, PART_SPECS, COMP_ID, VENDOR_ID) 
VALUES 
    (400, 'Angular Contact Bearing Pair', 110, '7204B, matched set', 301, 1003),
    (401, 'Timing Pulley 16 Teeth GT2', 85, 'Aluminum, 6mm belt', 300, 1004),
    (402, 'Valve Diaphragm Repair Kit', 130, 'EPDM seals + spring', 304, 1005),
    (403, 'Proximity Sensor Connector M12', 195, '4-pin, right-angle', 303, 1001),
    (404, '#50 Chain Sprocket 15T', 50, 'Bore 5/8", keyway', 302, 1002);

SELECT * FROM [dbo].[PART];
