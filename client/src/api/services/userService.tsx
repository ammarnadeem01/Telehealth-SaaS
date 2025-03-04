import apiClient from "../apiClient";

interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
}

const UserService = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    try {
      return (await apiClient.get<User[]>("/users")).data;
    } catch (error) {
      throw new Error(
        `Failed to fetch users: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  },

  // Create a user
  createUser: async (userData: CreateUserDto): Promise<User> => {
    try {
      const response = await apiClient.post<User>(
        "/users/create-user",
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to create user: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  },

  // Update a user
  updateUser: async (id: string, userData: UpdateUserDto): Promise<User> => {
    try {
      const response = await apiClient.put<User>(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to update user: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  },

  // Delete a user
  deleteUser: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/users/${id}`);
    } catch (error) {
      throw new Error(
        `Failed to delete user: ${
          error instanceof Error ? error.message : error
        }`
      );
    }
  },
};

export default UserService;
export type { User, CreateUserDto, UpdateUserDto };
