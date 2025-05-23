export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  role: string;
  lastActivityDate?: Date;
}
