import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUsers";
import { USERS_QUERY_KEY } from "./useUsers";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: createUser,
    onSuccess: () => {
      // Aqui você pode invalidar queries ou atualizar o cache, se necessário
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });

  return {
    createdUser: mutateAsync,
    isLoading: isPending,
  };
}
