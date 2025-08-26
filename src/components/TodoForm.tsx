"use client";

import { useState } from "react";
import useTodoStore from "@/store/todoStore";

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const addTodo = useTodoStore((s) => s.addTodo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addTodo({ title: title.trim(), status: "PENDING" });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Bugün neler yapacaksın..."
        className="flex-1 border text-stone-900 border-gray-300 p-3 rounded-xl shadow-sm"
      />
      <button type="submit" className="bg-blue-500 cursor-pointer text-white px-4 rounded-xl">
        +
      </button>
    </form>
  );
}
