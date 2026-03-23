"use client";

import type { FormEvent } from "react";

interface Task {
    id: number;
    text: string;
    pending: boolean;
}

interface TaskListProps {
    tasks: Task[];
    addTask: (formData: FormData) => void;
}

export default function TaskList({ tasks, addTask }: TaskListProps) {
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        addTask(formData);
        e.currentTarget.reset();
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h3 className="text-xl font-medium mb-3">Tasks</h3>

            <ul className="space-y-2 mb-4">
                {tasks.map((task) => (
                    <li key={task.id} className="p-2 border-b">
                        {task.text}
                        {task.pending && (
                            <small className="ml-2 text-gray-500 text-sm">
                                Adding Task...
                            </small>
                        )}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    name="task"
                    placeholder="Type in a task..."
                    className="flex-1 p-2 border"
                />
                <button type="submit" className="bg-gray-200 px-3 py-2 cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    );
}