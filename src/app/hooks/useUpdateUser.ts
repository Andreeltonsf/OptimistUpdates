import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUser } from "../services/updateUsers";
import type { IUser } from "../types/IUser";
import { USERS_QUERY_KEY } from "./useUsers";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onMutate: async (variables) => {
      // Cancel any outgoing refetches to prevent optimistic update conflicts

      const previousUserData =
        queryClient.getQueryData<IUser[]>(USERS_QUERY_KEY);

      queryClient.setQueryData<IUser[]>(USERS_QUERY_KEY, (old) =>
        old?.map((user) =>
          user.id === variables.id ? { ...user, ...variables } : user
        )
      );

      return { previousUserData };
    },
    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      if (context?.previousUserData) {
        queryClient.setQueryData<IUser[]>(
          USERS_QUERY_KEY,
          context?.previousUserData
        );
      }
      toast.error("Failed to update user");
    },
  });

  return {
    updateUser: mutateAsync,
    isLoading: isPending,
  };
}
