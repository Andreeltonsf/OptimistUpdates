import { useUpdateUser } from "@/app/hooks/useUpdateUser";
import { useUsers } from "@/app/hooks/useUsers";
import { cn } from "@/app/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";

export function UsersList() {
  const { users, isLoading } = useUsers();
  const { updateUser } = useUpdateUser();

  async function handleCheckedChange(id: string, blocked: boolean) {
    await updateUser({
      id,
      blocked,
    });
  }
  return (
    <div className="space-y-4 mb-8">
      {isLoading && (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      )}
      {users.map((user) => (
        <div
          key={user.id}
          className={cn(
            "border rounded-md p-4 flex items-center justify-between",
            user.status === "pending" && "opacity-70",
            user.status === "error" && "border-destructive bg-destructive/10"
          )}
        >
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://github.com/${user.username}.png`} />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <strong className="text-lg block leading-4">{user.name}</strong>
              <small className="text-muted-foreground">@{user.username}</small>
            </div>
          </div>
          <Switch
            type="button"
            className={user.status === "error" ? "hidden" : "cursor-pointer"}
            checked={user.blocked}
            onCheckedChange={(blocked) => handleCheckedChange(user.id, blocked)}
            disabled={user.status === "pending" || user.status === "error"}
          />
        </div>
      ))}
    </div>
  );
}
