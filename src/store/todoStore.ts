import { create } from "zustand";

type Todo = {
  id: string;
  title: string;
  description?: string;
  status: string;
};

type TodoState = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
}));

export default useTodoStore;
