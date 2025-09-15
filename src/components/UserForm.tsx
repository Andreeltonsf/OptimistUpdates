import { useCreateUser } from "@/app/hooks/useCreaterUser";
import React from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function UserForm() {
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");

  const { createdUser, isLoading } = useCreateUser();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setName("");
      setUsername("");
      await createdUser({
        name,
        username,
        blocked: false,
      });
    } catch (err) {
      toast.error("Erro ao cadastrar usuário");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-2 bg-card p-4 rounded-lg"
    >
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
        className="mb-4"
      />
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        className="mb-4"
      />
      <Button type="submit" className="self-end" disabled={isLoading}>
        Cadastrar
      </Button>
    </form>
  );
}
