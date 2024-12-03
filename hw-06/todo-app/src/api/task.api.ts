import ITask from "../dto/ITask";
import { api } from "./axios";

const slowMode = false;

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getAllTasks() : Promise<ITask[]> {
    if (slowMode) await sleep(300);
    const result = await api.get("/tasks");
    return result.data;
}

export async function getTaskWithTitle(title: string): Promise<ITask[]> {
    if (slowMode) await sleep(300);
    const result = await api.get("/tasks?title=" + title);
    return result.data;
}

export async function createTask(task: ITask): Promise<ITask> {
    if (slowMode) await sleep(300);
    const result = await api.post("/tasks", task)
    return result.data;
}

export async function markTask(id: string): Promise<ITask> {
    // if (slowMode) await sleep(300);
    const result = await api.patch("/tasks/" + id);
    return result.data;
}