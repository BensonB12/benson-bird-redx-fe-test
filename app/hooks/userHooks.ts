import type { User } from "@prisma/client";
import { useState, useEffect } from "react";
import { userService } from "~/services/userService";

export interface UseGetPeopleQueryResult {
  users: User[];
  loading: boolean;
  error: string | null;
}

// I am used to using react-query if that was not obvious, but I want to communicate that I understand this well
export const useGetPeopleQuery = (): UseGetPeopleQueryResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      const users = await userService.getUsers();

      if (!users) {
        setError("Failed to fetch users");
        setLoading(false);
        return;
      }

      setUsers(users);
      setLoading(false);
    })();
  }, []);

  return { users, loading, error };
};
