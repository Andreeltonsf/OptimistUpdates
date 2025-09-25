import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../services/listUsers";
import type { IUser } from "../types/IUser";
import type { WithStatus } from "../types/utils";

export const USERS_QUERY_KEY = ["users"];


export type UserCacheData = WithStatus<IUser>[];

export function useUsers() {
  const { data, isLoading } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: async () => {
      const users = await listUsers();
      return users as UserCacheData;
    },
    staleTime: Infinity,
  });

  return {
    users: data ?? [],
    isLoading,
  };
}
