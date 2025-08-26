"use client";

import { create } from "zustand";
import type { Todo, Status } from "@/services/todos";
import { listTodos, createTodo, updateTodo, deleteTodo } from "@/services/todos";

type TodoState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;

  setTodos: (todos: Todo[]) => void;

  fetchTodos: () => Promise<void>;
  addTodo: (input: { title: string; description?: string; status?: Status }) => Promise<void>;
  editTodo: (id: string, input: Partial<Omit<Todo, "id">>) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
};

const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  setTodos: (todos) => set({ todos }),

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await listTodos();
      set({ todos: data, loading: false });
    } catch (e: any) {
      set({ error: e?.message ?? "Failed to fetch todos", loading: false });
    }
  },

  addTodo: async (input) => {
    set({ error: null });
    try {
      const created = await createTodo(input);
      set({ todos: [created, ...get().todos] });
    } catch (e: any) {
      set({ error: e?.message ?? "Failed to create todo" });
    }
  },

  editTodo: async (id, input) => {
    set({ error: null });
    try {
      const updated = await updateTodo(id, input);
      set({
        todos: get().todos.map((t) => (t.id === id ? updated : t)),
      });
    } catch (e: any) {
      set({ error: e?.message ?? "Failed to update todo" });
    }
  },

  removeTodo: async (id) => {
    set({ error: null });
    try {
      await deleteTodo(id);
      set({ todos: get().todos.filter((t) => t.id !== id) });
    } catch (e: any) {
      set({ error: e?.message ?? "Failed to delete todo" });
    }
  },
}));

export default useTodoStore;
