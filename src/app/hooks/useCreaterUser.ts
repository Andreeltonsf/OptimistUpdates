import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../services/createUsers";
import { USERS_QUERY_KEY, type UserCacheData } from "./useUsers";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    //onMutate - executa diretamente antes de executar a função
    onMutate: (variables) => {
      const tmpUserId = String(Math.random());

      //setQueryData - seta o valor de uma query no cache
      //Contudo,precisamos tipar o dado que está sendo alterado
      //para que o typescript saiba que é um objeto do tipo IUser
      queryClient.setQueryData<UserCacheData>(USERS_QUERY_KEY, (old) =>
        old?.concat({
          ...variables,
          id: tmpUserId,
          status: "pending",
        })
      );

      //Utilizando o contexto da query para atualizar o id do usuário temporário
      //que foi criado de forma otimista
      return { tmpUserId };
    },
    onSuccess: async (data, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      queryClient.setQueryData<UserCacheData>(USERS_QUERY_KEY, (old) =>
        old?.map((user) => (user.id === context?.tmpUserId ? data : user))
      );
    },
    onError: async (_error, _variables, context) => {
      //Removendo o usuário temporário do cache
      //Utiliza-se o filter para manter apenas os usuários que não correspondem ao usuário temporário

      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });
      //Iremos cancelar as queries em andamento para evitar conflitos

      queryClient.setQueryData<UserCacheData>(USERS_QUERY_KEY, (old) =>
        old?.map((user) =>
          user.id === context?.tmpUserId ? { ...user, status: "error" } : user
        )
      );
    },
  });

  return {
    createdUser: mutateAsync,
    isLoading: isPending,
  };
}
