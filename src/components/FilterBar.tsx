"use client"
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface FilterBarProps {
    onSearch: (query: string) => void;
    onStatusFilter: (status: string) => void;
    onPriorityFilter: (priority: string) => void;
}

export default function FilterBar({ onSearch, onStatusFilter, onPriorityFilter }: FilterBarProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        onSearch(value);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
            <div className="flex-1">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>
            <div className="flex gap-4">
                <select
                    onChange={(e) => onStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue=""
                >
                    <option value="">All Status</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <select
                    onChange={(e) => onPriorityFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue=""
                >
                    <option value="">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
        </div>
    );
}
