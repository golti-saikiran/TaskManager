import { format } from 'date-fns';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface TaskCardProps {
    task: {
        _id: string;
        title: string;
        description: string;
        status: string;
        priority: string;
        dueDate?: Date;
        createdAt: Date;
    };
    onEdit: (task: TaskCardProps['task']) => void;
    onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const priorityColors = {
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-red-100 text-red-800'
    };

    const statusColors = {
        'To Do': 'bg-gray-100 text-gray-800',
        'In Progress': 'bg-blue-100 text-blue-800',
        'Completed': 'bg-purple-100 text-purple-800'
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                        {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status as keyof typeof statusColors]}`}>
                        {task.status}
                    </span>
                    <button
                        onClick={() => onEdit(task)}
                        className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this task?')) {
                                onDelete(task._id);
                            }
                        }}
                        className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </div>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <div className="flex justify-between text-sm text-gray-500">
                <span>Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}</span>
                {task.dueDate && (
                    <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                )}
            </div>
        </div>
    );
}
