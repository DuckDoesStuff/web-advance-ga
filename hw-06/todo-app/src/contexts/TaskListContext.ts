import {createContext} from "react";
import ITask from "../dto/ITask";

interface ITaskListContext {
    tasks: ITask[];
    setTasks: (tasks: ITask[]) => void;
}

export const TaskListContext = createContext<ITaskListContext | null>(null);