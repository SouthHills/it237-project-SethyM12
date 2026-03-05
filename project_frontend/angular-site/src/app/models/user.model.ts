export interface UserModel
{
  userId: string,
  userFname: string,
  userLname: string,
  userEmail: string | null,
  userRoleManager: number | boolean,
  plantId: string,
}
