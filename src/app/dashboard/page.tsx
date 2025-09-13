"use client"
import { RedirectToSignIn, useUser, SignOutButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import StatsCard from "@/components/StatsCard";
import TaskForm from "@/components/TaskForm";
import FilterBar from "@/components/FilterBar";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate?: Date;
    createdAt: Date;
    userId: string;
}

type EditableTask = Omit<Task, 'userId' | 'createdAt'>

export default function DashboardPage() {
    const { isSignedIn, user } = useUser();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [taskToEdit, setTaskToEdit] = useState<EditableTask | undefined>(undefined);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            if (user) {
                try {
                    const response = await fetch(`/api/task?userId=${user.id}`);
                    const data = await response.json();
                    if (response.ok) {
                        setTasks(data);
                        setFilteredTasks(data);
                    }
                } catch (error) {
                    console.error('Failed to fetch tasks:', error);
                }
            }
            setLoading(false);
        };

        fetchTasks();
    }, [user]);

    useEffect(() => {
        let filtered = [...tasks];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply status filter
        if (statusFilter) {
            filtered = filtered.filter(task => task.status === statusFilter);
        }

        // Apply priority filter
        if (priorityFilter) {
            filtered = filtered.filter(task => task.priority === priorityFilter);
        }

        setFilteredTasks(filtered);
    }, [tasks, searchQuery, statusFilter, priorityFilter]);

    if (!isSignedIn) {
        return <RedirectToSignIn />
    }

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    }

    const stats = {
        total: tasks.length,
        completed: tasks.filter(task => task.status === "Completed").length,
        inProgress: tasks.filter(task => task.status === "In Progress").length,
        todo: tasks.filter(task => task.status === "To Do").length,
        highPriority: tasks.filter(task => task.priority === "High").length,
        mediumPriority: tasks.filter(task => task.priority === "Medium").length,
        lowPriority: tasks.filter(task => task.priority === "Low").length
    };

    const refreshTasks = async () => {
        if (user) {
            try {
                const response = await fetch(`/api/task?userId=${user.id}`);
                const data = await response.json();
                if (response.ok) {
                    setTasks(data);
                }
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            }
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            const response = await fetch(`/api/task?taskId=${taskId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await refreshTasks();
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
    };

    const handlePriorityFilter = (priority: string) => {
        setPriorityFilter(priority);
    };

    return (
        <main className="flex min-h-screen bg-gray-50">
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Your Tasks</h1>
                </div>
                <FilterBar
                    onSearch={handleSearch}
                    onStatusFilter={handleStatusFilter}
                    onPriorityFilter={handlePriorityFilter}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TaskForm
                        onTaskAdded={refreshTasks}
                        taskToEdit={taskToEdit}
                        onEditComplete={() => {
                            setTaskToEdit(undefined);
                            refreshTasks();
                        }}
                    />
                    {filteredTasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={(task: EditableTask) => setTaskToEdit(task)}
                            onDelete={handleDeleteTask}
                        />
                    ))}
                    {tasks.length === 0 && !taskToEdit && (
                        <div className="col-span-full text-center text-gray-500 py-8">
                            Click the card above to create your first task!
                        </div>
                    )}
                </div>
            </div>
            <div className="w-80 p-6 border-l border-gray-200 bg-white flex flex-col h-screen">
                <div className="flex-grow">
                    <StatsCard {...stats} />
                </div>
                <SignOutButton redirectUrl="/">
                    < button
                        className="w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        Logout
                    </button >
                </SignOutButton>
            </div>
        </main>
    );
}