"use client";

import useTodoStore from "@/store/todoStore";

export default function TodoList() {
  const { todos } = useTodoStore();

  return (
    <ul className="mt-4">
      {todos.map((todo) => (
        <li key={todo.id} className="border p-2 my-2 rounded">
          {todo.title} - {todo.status}
        </li>
      ))}
    </ul>
  );
}
