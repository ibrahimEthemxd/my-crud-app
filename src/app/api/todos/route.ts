import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//? GET → Tüm todoları getir 200
export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos, { status: 200 });
}

//? POST → Yeni todo ekle
export async function POST(req: Request) {
  const body = await req.json();
  const todo = await prisma.todo.create({ data: body });
  return NextResponse.json(todo, { status: 201 });
}

//? PUT → Mevcut todo güncelle 
export async function PUT(req: Request) {
  const body = await req.json(); 
  const updatedTodo = await prisma.todo.update({
    where: { id: body.id },
    data: {
      title: body.title,
      status: body.status,
    },
  });
  return NextResponse.json(updatedTodo, { status: 200 });
}

//! DELETE → Todo sil
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
}
