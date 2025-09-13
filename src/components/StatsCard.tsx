interface StatsCardProps {
    total: number;
    completed: number;
    inProgress: number;
    todo: number;
    highPriority: number;
    mediumPriority: number;
    lowPriority: number;
}

export default function StatsCard({
    total,
    completed,
    inProgress,
    todo,
    highPriority,
    mediumPriority,
    lowPriority
}: StatsCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-full mt-20">
            <h3 className="text-lg font-semibold mb-4">Task Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-700">Status</h4>
                    <div>
                        <p className="text-sm text-gray-600">Total Tasks</p>
                        <p className="text-2xl font-bold">{total}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-purple-600">{completed}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">In Progress</p>
                        <p className="text-2xl font-bold text-blue-600">{inProgress}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">To Do</p>
                        <p className="text-2xl font-bold text-gray-600">{todo}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="text-md font-semibold text-gray-700">Priority</h4>
                    <div>
                        <p className="text-sm text-gray-600">High Priority</p>
                        <p className="text-2xl font-bold text-red-600">{highPriority}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Medium Priority</p>
                        <p className="text-2xl font-bold text-yellow-600">{mediumPriority}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Low Priority</p>
                        <p className="text-2xl font-bold text-green-600">{lowPriority}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
