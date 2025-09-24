import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../services/listUsers";

export const USERS_QUERY_KEY = ["users"];



export function useUsers() {
  const { data, isLoading } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: listUsers,
  });

  return {
    users: data ?? [],
    isLoading,
  };
}
