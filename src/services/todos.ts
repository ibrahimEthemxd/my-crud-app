import { getApi, postApi, putApi, deleteApi } from "./http";

export type Status = "PENDING" | "IN_PROGRESS" | "DONE";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdAt?: string;
  updatedAt?: string;
};

export async function listTodos() {
  return getApi<Todo[]>("/api/todos");
}

export async function createTodo(input: {
  title: string;
  description?: string;
  status?: Status;
}) {
  return postApi<Todo>("/api/todos", input);
}

export async function updateTodo(id: string, input: Partial<Omit<Todo, "id">>) {
  return putApi<Todo>("/api/todos", { id, ...input });
}

export async function deleteTodo(id: string) {
  return deleteApi<{ message: string }>("/api/todos", { id });
}
