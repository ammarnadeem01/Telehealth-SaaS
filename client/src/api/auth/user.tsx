// import { IUser } from "@types/user";
// import axios from "axios";

// export const fetchUsers = async () => {
//   axios
//     .get("https://localhost:3000/api/v1/users")
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const registerUser = async (body: Partial<IUser>) => {
//   axios
//     .post("https://localhost:3000/api/v1/users/register", body)
//     .then((res) => {
//       console.log(res);
//       return res;
//     })
//     .catch((err) => {
//       console.log(err);
//       throw new Error("Failed to create user");
//     });
// };

// export const loginUser = async (body: Partial<IUser>) => {
//   axios
//     .post("https://localhost:3000/api/v1/users/login", body)
//     .then((res) => {
//       console.log(res);
//       return res;
//     })
//     .catch((err) => {
//       console.log(err);
//       throw new Error("Failed to login user");
//     });
// };
