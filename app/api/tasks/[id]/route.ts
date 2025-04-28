import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getInternalUserId(clerkUserId: string) {
    const user = await prisma.user.findUnique({
        where: { clerkUserId },
    });

    if (!user) throw new Error("User not found");
    return user.id;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        const internalUserId = await getInternalUserId(clerkUserId);

        if (task.userId !== internalUserId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(task);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const { title, description, status } = await req.json();
        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        const internalUserId = await getInternalUserId(clerkUserId);

        if (task.userId !== internalUserId) {
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
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        const internalUserId = await getInternalUserId(clerkUserId);

        if (task.userId !== internalUserId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.task.delete({ where: { id } });

        return NextResponse.json({ message: "Todo deleted successfully" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
