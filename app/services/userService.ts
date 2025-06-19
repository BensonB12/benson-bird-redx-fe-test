import type { User } from "~/models/user";

export const userService = {
  async getUsers(): Promise<User[] | undefined> {
    try {
      const response = await fetch("/api/users?client=true");
      if (!response.ok) {
        console.error("Failed to fetch users:", response.statusText);
        return undefined;
      }
      const data = await response.json();
      return data.users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return undefined;
    }
  },
};
