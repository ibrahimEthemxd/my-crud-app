// src/app/api/todos/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//? GET → Tüm todoları getir
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(todos || [], { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json([], { status: 500 }); 
  }
}


//? POST → Yeni todo ekle
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, status } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description: description || "",
        status: status || "PENDING",
      },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

//? PUT → Mevcut todo güncelle
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description, status } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { title, description, status },
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

//! DELETE → Todo sil
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Valid ID is required" },
        { status: 400 }
      );
    }

    await prisma.todo.delete({ where: { id } });

    return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
