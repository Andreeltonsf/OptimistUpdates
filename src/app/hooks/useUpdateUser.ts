import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/updateUsers";
import { USERS_QUERY_KEY } from "./useUsers";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      // Aqui você pode invalidar queries ou atualizar o cache, se necessário
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });

  return {
    updateUser: mutateAsync,
    isLoading: isPending,
  };
}
