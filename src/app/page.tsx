"use client";

import { useEffect } from "react";
import useTodoStore from "@/store/todoStore";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function HomePage() {
  const { setTodos } = useTodoStore();

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-600 via-blue-200 to-indigo-700">
      <div className="bg-blue-50 backdrop-blur-lg shadow-2xl rounded-2xl m-4 p-8 w-full max-w-xl">
        <h1 className="text-center text-2xl font-bold text-blue-600 mb-6">
          İEÖ - Yapılacaklar Listesi
        </h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}
