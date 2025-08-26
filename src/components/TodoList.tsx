"use client";

import useTodoStore from "@/store/todoStore";
import { useState } from "react";

export default function TodoList() {
  const { todos, setTodos } = useTodoStore();
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos?id=${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleStatus = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updated = { ...todo, status: todo.status === "pending" ? "done" : "pending" };

    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    const data = await res.json();
    setTodos(todos.map((t) => (t.id === id ? data : t)));
  };

  const startEdit = (id: string, title: string) => {
    setEditId(id);
    setEditText(title);
  };

  const submitEdit = async (id: string) => {
    const res = await fetch("/api/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: editText, status: "pending" }),
    });
    const data = await res.json();
    setTodos(todos.map((t) => (t.id === id ? data : t)));
    setEditId(null);
    setEditText("");
  };

  return (
    <ul className="mt-6 flex flex-col gap-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex justify-between items-center p-3 bg-white rounded-xl shadow-md border border-gray-200 transition ${
            todo.status === "done" ? "opacity-50 line-through" : ""
          }`}
        >
          {editId === todo.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 text-stone-800 outline-0 border p-2 rounded-lg bg-green-200"
            />
          ) : (
            <span className="text-stone-800">{todo.title}</span>
          )}

          <div className="flex gap-2 ml-4">
            {editId === todo.id ? (
              <button
                onClick={() => submitEdit(todo.id)}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 cursor-pointer"
              >
                ✔
              </button>
            ) : (
              <button
                onClick={() => toggleStatus(todo.id)}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 cursor-pointer"
              >
                ✔
              </button>
            )}
            {editId === todo.id ? null : (
              <button
                onClick={() => startEdit(todo.id, todo.title)}
                className="bg-yellow-400 text-white p-2 rounded-lg hover:bg-yellow-500 cursor-pointer"
              >
                ✏️
              </button>
            )}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 cursor-pointer"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
