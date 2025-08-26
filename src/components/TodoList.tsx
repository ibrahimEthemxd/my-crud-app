"use client";

import { useState } from "react";
import useTodoStore from "@/store/todoStore";

export default function TodoList() {
  const { todos, editTodo, removeTodo } = useTodoStore();
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const submitEdit = async (id: string) => {
    await editTodo(id, { title: editText, status: "PENDING" });
    setEditId(null);
    setEditText("");
  };

  return (
    <ul className="mt-6 flex flex-col gap-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex justify-between items-center p-3 bg-white rounded-xl ${todo.status === "DONE" ? "opacity-50 line-through" : ""
            }`}
        >
          {editId === todo.id ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 border p-2 rounded-lg break-words bg-green-300 text-stone-800 outline-0"
            />
          ) : (
            <span className="text-stone-800 flex-1 break-words whitespace-pre-wrap">
              {todo.title}
            </span>

          )}

          <div className="flex gap-2">
            {editId === todo.id ? (
              <button
                onClick={() => submitEdit(todo.id)}
                className="bg-green-500 text-white p-2 rounded-lg cursor-pointer"
              >
                ✔
              </button>
            ) : (
              <button
                onClick={() =>
                  editTodo(todo.id, {
                    status: todo.status === "PENDING" ? "DONE" : "PENDING",
                  })
                }
                className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer"
              >
                ✔
              </button>
            )}
            {editId === todo.id ? null : (
              <button
                onClick={() => {
                  setEditId(todo.id);
                  setEditText(todo.title);
                }}
                className="bg-yellow-400 text-white p-2 rounded-lg cursor-pointer"
              >
                ✏️
              </button>
            )}
            <button
              onClick={() => removeTodo(todo.id)}
              className="bg-red-500 text-white p-2 rounded-lg cursor-pointer"
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
