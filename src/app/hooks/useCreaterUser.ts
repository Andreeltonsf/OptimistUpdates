import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUsers";
import type { IUser } from "../types/IUser";
import { USERS_QUERY_KEY } from "./useUsers";

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    //onMutate - executa diretamente antes de executar a função
    onMutate: (variables) => {
      const tmpUserId = String(Math.random());

      return { tmpUserId };
    },
    // Irá atualizar a lista de usuários após a função ser executada
    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, (old) =>
        old?.map((user) => (user.id === context.tmpUserId ? data : user))
      );
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, (old) =>
        old?.filter((user) => user.id !== context?.tmpUserId)
      );
    },
  });

  return {
    createdUser: mutateAsync,
    isLoading: isPending,
  };
}
