export enum UserRole {
  Patient = "patient",
  Doctor = "doctor",
  Admin = "admin",
}
export interface IUser {
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
