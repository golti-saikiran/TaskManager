"use client"
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { FiX, FiPlus } from 'react-icons/fi';

interface TaskFormProps {
    onTaskAdded: () => void;
    taskToEdit?: {
        _id: string;
        title: string;
        description: string;
        status: string;
        priority: string;
        dueDate?: Date;
    };
    onEditComplete?: () => void;
    className?: string;
}

export default function TaskForm({ onTaskAdded, taskToEdit, onEditComplete, className }: TaskFormProps) {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'Medium',
        dueDate: ''
    });

    useEffect(() => {
        if (taskToEdit) {
            setIsOpen(true);
            setFormData({
                title: taskToEdit.title,
                description: taskToEdit.description || '',
                status: taskToEdit.status,
                priority: taskToEdit.priority,
                dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : ''
            });
        }
    }, [taskToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const url = taskToEdit ? `/api/task` : '/api/task';
            const method = taskToEdit ? 'PUT' : 'POST';
            const payload = taskToEdit ? {
                taskId: taskToEdit._id,
                ...formData,
                dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined
            } : {
                ...formData,
                userId: user.id,
                dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined
            };

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setFormData({
                    title: '',
                    description: '',
                    status: 'To Do',
                    priority: 'Medium',
                    dueDate: ''
                });
                setIsOpen(false);
                if (taskToEdit) {
                    onEditComplete?.();
                } else {
                    onTaskAdded();
                }
            }
        } catch (error) {
            console.error(taskToEdit ? 'Failed to update task:' : 'Failed to create task:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className={className}>
            {!isOpen ? (
                <div
                    onClick={() => setIsOpen(true)}
                    className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors min-h-[200px] group"
                >
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors mb-3">
                        <FiPlus className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-gray-600 group-hover:text-blue-600 font-medium">Create New Task</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Create New Task</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                                Due Date
                            </label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Creating...' : 'Create Task'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
