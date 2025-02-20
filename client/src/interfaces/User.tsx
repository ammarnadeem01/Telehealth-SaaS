export enum UserRole {
  Patient = "patient",
  Doctor = "doctor",
  Admin = "admin",
}
interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  phoneNumber: string;
  address: string;
  profilePicture: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  data: User;
  token: string;
}
