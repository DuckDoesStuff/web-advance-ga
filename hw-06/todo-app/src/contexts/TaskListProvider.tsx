import React, {useReducer} from "react";
import ITask from "../dto/ITask";
import {TaskListContext} from "./TaskListContext.ts";

export interface ActionType {
    type: "add" | "filter" | "update" | "check";
    payload?: ITask | ITask[] | string;
}

export interface StateType {
    tasks: ITask[];
    filteredTasks: ITask[];
}

function reducerFunction(state: StateType, action: ActionType): StateType {
    switch (action.type) {
        case "update":
            return {
                filteredTasks: action.payload as ITask[],
                tasks: action.payload as ITask[],
            };
        case "add":
            const newTask = action.payload as ITask;
            return {
                filteredTasks: [newTask, ...state.filteredTasks],
                tasks: [newTask, ...state.tasks],
            };
        case "check":
            return {
                filteredTasks: state.filteredTasks.map((task) =>
                    task.id === action.payload
                        ? { ...task, done: !task.done }
                        : task
                ),
                tasks: state.tasks.map((task) =>
                    task.id === action.payload
                        ? { ...task, done: !task.done }
                        : task
                ),
            };
        case "filter":
            const searchTerm = action.payload as string;
            return {
                ...state,
                tasks: searchTerm
                    ? state.filteredTasks.filter((task) =>
                          task.title.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                    : state.filteredTasks,
            };
        default:
            throw new Error("Unknown action type");
    }
}

export const TaskListProvider = ({children}: { children: React.ReactNode }) => {
    const initalState: StateType = {
        tasks: [
            {
                id: "1",
                title: "Test",
                description: "description",
                done: false
            }
        ],
        filteredTasks: [
            {
                id: "1",
                title: "Test",
                description: "description",
                done: false
            }
        ]
    }
    const [state, dispatch] = useReducer(reducerFunction, initalState);

    return (
        <TaskListContext.Provider value={{state, dispatch}}>
            {children}
        </TaskListContext.Provider>
    )
}