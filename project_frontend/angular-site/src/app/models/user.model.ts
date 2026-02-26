export interface UserModel
{
  USER_ID: string,
  USER_FNAME: string,
  USER_LAST_NAME: string,
  USER_EMAIL: string | null,
  USER_PASSWORD: string,
  USER_ROLE_MANAGER: string,
  PLANT_ID: string, /*cant be null */
}
