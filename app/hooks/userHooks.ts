import type { User } from "@prisma/client";
import { useState, useEffect } from "react";
import { userService } from "~/services/userService";

export interface UseGetPeopleQueryResult {
  users: User[];
  loading: boolean;
  error: string | null;
}

interface CacheEntry {
  timestamp: number;
  data: User[];
}

const CACHE_KEY = "peopleCache";
const CACHE_TTL = 1000 * 60 * 5; // 5 mins

// I am used to using react-query if that was not obvious, but I want to communicate that I understand this well
export const useGetPeopleQuery = (): UseGetPeopleQueryResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);

      const localStorageJson = localStorage.getItem(CACHE_KEY);
      if (localStorageJson) {
        try {
          const { timestamp, data }: CacheEntry = JSON.parse(localStorageJson);
          if (Date.now() - timestamp < CACHE_TTL) {
            setUsers(data);
            setLoading(false);
            return;
          }
        } catch {
          console.error(
            "Failed to parse localStorage cache:",
            localStorageJson
          );
        }
      }

      const users = await userService.getUsers();

      if (!users) {
        setError("Failed to fetch users");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: users })
      );

      setUsers(users);
      setLoading(false);
      localStorage.setItem("users", JSON.stringify(users));
    })();
  }, []);

  return { users, loading, error };
};
