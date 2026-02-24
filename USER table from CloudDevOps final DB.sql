DROP TABLE [USER];

CREATE TABLE [USER] (
USER_ID int NOT NULL PRIMARY KEY,
USER_FNAME varchar(32) NOT NULL,
USER_LNAME varchar(32) NOT NULL,
USER_EMAIL varchar(64),
USER_PASSWORD varchar(64) NOT NULL,
USER_ROLE_MANAGER BIT NOT NULL, --0=false, 1=true
PLANT_ID int NOT NULL,
FOREIGN KEY (PLANT_ID) REFERENCES [dbo].[PLANT](PLANT_ID)
);

INSERT INTO [USER] (USER_ID, USER_FNAME, USER_LNAME, USER_EMAIL, USER_PASSWORD, USER_ROLE_MANAGER, PLANT_ID)
VALUES 
    (200, 'Michael', 'Thompson', 'm.thompson@facility.com', 'ABC123!', 0, 102),
    (201, 'Jennifer', 'Walker', 'j.walker@company.com', 'ILoveDogs10', 1, 100),
    (202, 'David', 'Martinez', NULL, 'SportsRCool7', 0, 104),
    (203, 'Rachel', 'Bennett', 'r.bennett@site.org', 'Xbox247!', 1, 103),
    (204, 'Kevin', 'Nguyen', 'k.nguyen@plant.org', 'BestFoodBurgers!', 0, 101);


SELECT * FROM [USER];

