import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        if (task.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(task);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const { title, description, status } = await req.json();
        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        if (task.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const updatedTodo = await prisma.task.update({
            where: { id },
            data: { title, description, status },
        });

        return NextResponse.json(updatedTodo);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        if (task.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.task.delete({ where: { id } });

        return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
