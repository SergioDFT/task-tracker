import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ITEMS_PER_PAGE = 10;

export async function GET(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      orderBy: { createdAt: "desc" },
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
    });

    const totalTasks = await prisma.task.count({
      where: {
        userId,
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
    });

    const totalPages = Math.ceil(totalTasks / ITEMS_PER_PAGE);

    return NextResponse.json({
      tasks,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" + err},
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { tasks: true },
  });
  console.log("User:", user);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { title, description, status } = await req.json();

  const task = await prisma.task.create({
    data: { title, description, status, userId },
  });

  return NextResponse.json(task, { status: 201 });
}