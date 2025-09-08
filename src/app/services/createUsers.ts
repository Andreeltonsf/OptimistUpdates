import type { IUser } from "../types/IUser";

type ICreateUserDTO = Omit<IUser, "id">;

export async function createUser({ blocked, name, username }: ICreateUserDTO) {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blocked,
      name,
      username,
    }),
  });
  const body = await response.json();
  return body as IUser;
}
