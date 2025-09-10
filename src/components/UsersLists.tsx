import { useUpdateUser } from "@/app/hooks/useUpdateUser";
import { useUsers } from "@/app/hooks/useUsers";
import type { IUser } from "@/app/types/IUser";
import { useMutationState } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";

export function UsersLists() {
  const { users, isLoading } = useUsers();
  const { updateUser } = useUpdateUser();

  const pendinhUsers = useMutationState({
    filters: {
      mutationKey: ["createUser"],
    },
    select: (mutation) => mutation.state.variables as Omit<IUser, "id">,
  });

  async function handleBlockedChange(id: string, blocked: boolean) {
    await updateUser({
      blocked,
      id,
    });
  }
  return (
    <div>
      {isLoading && (
        <div>
          <Skeleton className="h-[74px] " />
          <Skeleton className="h-[74px] " />
          <Skeleton className="h-[74px] " />
        </div>
      )}
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 mb-4 border rounded-lg flex flex-row justify-between "
        >
          <div>
            <Avatar>
              <AvatarImage src={`https://github.com/${user.username}.png`} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">
              {user.name} ({user.username})
            </h2>
          </div>

          <Switch
            className="mt-4"
            //checked={user.blocked}
            onCheckedChange={(blocked) => handleBlockedChange(user.id, blocked)}
          />
        </div>
      ))}
    </div>
  );
}
