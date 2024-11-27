import ITask from "../dto/ITask";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllTasks() : Promise<ITask[]> {
    const result = await fetch(API_URL + "/tasks");
    return result.json();
}

export async function getTaskWithTitle(title: string): Promise<ITask[]> {
    const result = await fetch(API_URL + "/tasks?title=" + title);
    return result.json();
}

export async function createTask(task: ITask): Promise<ITask> {
    const result = await fetch(API_URL + "/tasks", {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(task),
    });
    return result.json();
}

export async function markTask(id: string): Promise<ITask> {
    const result = await fetch(API_URL + "/tasks/" + id, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "PATCH",
    });
    return result.json();
}