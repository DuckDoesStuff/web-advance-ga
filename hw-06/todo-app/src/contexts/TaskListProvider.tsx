import React, {useReducer} from "react";
import ITask from "../dto/ITask";
import {TaskListContext} from "./TaskListContext.ts";

export interface ActionType {
    type: "add" | "filter" | "update" | "check";
    payload?: ITask | ITask[] | string;
}

export interface StateType {
    tasks: ITask[];
}

function reducerFunction(state: StateType, action: ActionType): StateType {
    switch (action.type) {
        case "update":
            return {
                tasks: action.payload as ITask[],
            };
        case "add":
            const newTask = action.payload as ITask;
            return {
                tasks: [...state.tasks, newTask],
            };
        case "check":
            return {
                tasks: state.tasks.map((task) =>
                    task.id === action.payload
                        ? { ...task, done: !task.done }
                        : task
                ),
            };
        case "filter":
            return {
                tasks: action.payload as ITask[]
            };
        default:
            throw new Error("Unknown action type");
    }
}

export const TaskListProvider = ({children}: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducerFunction, {tasks: []});

    return (
        <TaskListContext.Provider value={{state, dispatch}}>
            {children}
        </TaskListContext.Provider>
    )
}