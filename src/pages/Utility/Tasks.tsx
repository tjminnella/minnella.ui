"use client";

import { useState } from "react";
import TaskList from "./taskList";
import SaveTask from "../../actions/saveTask";

interface Task {
    id: number;
    text: string;
    pending: boolean;
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [nextId, setNextId] = useState(1); // For generating unique IDs

    async function addTask(formData: FormData) {
        const newTaskText = formData.get("task") as string;

        if (!newTaskText || newTaskText.trim() === "") {
            alert("Task text cannot be empty.");
            return;
        }

        try {
            const savedTask = await SaveTask(newTaskText);
            setTasks((prev) => [
                ...prev,
                { id: nextId, text: savedTask, pending: false }
            ]);
            setNextId((prev) => prev + 1);
        } catch (error) {
            console.error("Failed to save task:", error);
            alert("An error occurred while saving the task. Please try again.");
        }
    }

    return <TaskList tasks={tasks} addTask={addTask} />;
}