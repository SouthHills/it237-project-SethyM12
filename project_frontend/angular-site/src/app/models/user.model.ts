export interface UserModel
{
  USER_ID: string,
  USER_FNAME: string,
  USER_LAST_NAME: string,
  USER_EMAIL: string | null,
  USER_PASSWORD: string,
  USER_ROLE_MANAGER: string,
  PLANT_ID: string, /*cant be null */

 /* CREATE TABLE [USER] (
    USER_ID int NOT NULL PRIMARY KEY,
  USER_FNAME varchar(32) NOT NULL,
  USER_LNAME varchar(32) NOT NULL,
  USER_EMAIL varchar(64),
  USER_PASSWORD varchar(64) NOT NULL,
  USER_ROLE_MANAGER BIT NOT NULL, --0=false, 1=true
  PLANT_ID int NOT NULL,
  FOREIGN KEY (PLANT_ID) REFERENCES [dbo].[PLANT](PLANT_ID)
  );*/
}
