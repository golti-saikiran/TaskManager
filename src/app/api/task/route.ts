import Task from "@/models/Tasks";
import { connectDB } from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { title, description, status, userId } = await request.json();

        if (!title || !userId) {
            return NextResponse.json({ error: "Title and UserId are required" }, { status: 400 });
        }

        const newTask = new Task({
            title,
            description,
            status,
            userId
        });

        await newTask.save();
        return NextResponse.json(newTask, { status: 201 });
    } catch (err) {
        console.error('Failed to create task:', err);
        return NextResponse.json({ error: "Failed to create a new task" }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const userId = request.nextUrl.searchParams.get("userId");
        const tasks = await Task.find(userId ? { userId } : {}).sort({ createdAt: -1 });

        if (tasks.length === 0) {
            return NextResponse.json({ message: "No tasks found" }, { status: 404 });
        }
        return NextResponse.json(tasks, { status: 200 });
    } catch (err) {
        console.error('Failed to fetch tasks:', err);
        return NextResponse.json({ error: "Failed to get the tasks information" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        await connectDB();
        const taskId = request.nextUrl.searchParams.get("taskId");

        if (!taskId) {
            return NextResponse.json({ error: "TaskId is required" }, { status: 400 });
        }

        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(deletedTask, { status: 200 });
    } catch (err) {
        console.error('Failed to delete task:', err);
        return NextResponse.json({ error: "Failed to delete the task" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        await connectDB();
        const { taskId, title, description, status } = await request.json();

        if (!taskId) {
            return NextResponse.json({ error: "TaskId is required" }, { status: 400 });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, status },
            { new: true }
        );

        if (!updatedTask) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTask, { status: 200 });
    } catch (err) {
        console.error('Failed to update task:', err);
        return NextResponse.json({ error: "Failed to update the task" }, { status: 500 });
    }
}