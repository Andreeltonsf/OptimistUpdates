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
      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, (old) =>
        old?.concat({
          ...variables,
          id: String(Math.random()),
        })
      );
    },
  });

  return {
    createdUser: mutateAsync,
    isLoading: isPending,
  };
}
