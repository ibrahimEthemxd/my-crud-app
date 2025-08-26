"use client";

import { useEffect } from "react";
import useTodoStore from "@/store/todoStore";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function HomePage() {
  const { todos, setTodos } = useTodoStore();

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (title: string) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, status: "pending" }),
    });
    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList />
    </div>
  );
}
