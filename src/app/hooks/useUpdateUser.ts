import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUser } from "../services/updateUsers";
import type { IUser } from "../types/IUser";
import { USERS_QUERY_KEY } from "./useUsers";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    retry: false,
    onMutate: (variables) => {
      //Utilizamos o map para pegar o usuário que foi clicado ou editado e atualizamos ele na cache

      //Tirando uma "foto" dos usuários antes de atualizar a cache
      const previousUser = queryClient.getQueryData<IUser[]>(USERS_QUERY_KEY);

      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, (old) =>
        old?.map((user) =>
          user.id === variables.id ? { ...user, ...variables } : user
        )
      );

      return { previousUser };
    },
    onError: async (_error, _variables, context) => {
      //Se der erro, voltamos a cache para o estado anterior

      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, context?.previousUser);

      toast.error("Não foi possível atualizar o usuário");
    },
  });

  return {
    updateUser: mutateAsync,
    isLoading: isPending,
  };
}
