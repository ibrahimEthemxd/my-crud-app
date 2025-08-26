"use client";

import { useState } from "react";
import useTodoStore from "@/store/todoStore";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const { todos, setTodos } = useTodoStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, status: "pending" }),
    });

    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Bugün neler yapacaksın..."
        className="flex-1 border text-stone-900 border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-xl hover:bg-blue-600 transition cursor-pointer"
      >
        +
      </button>
    </form>
  );
}
