import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  const body = await req.json();
  const todo = await prisma.todo.create({ data: body });
  return NextResponse.json(todo, { status: 201 });
}
