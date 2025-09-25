export type WithStatus<T> = T & { status?: "error" | "pending" | "success" };
