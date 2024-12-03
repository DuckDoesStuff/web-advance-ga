import React, {createContext} from "react";
import {ActionType, StateType} from "./TaskListProvider.tsx";

interface ITaskListContext {
    state: StateType;
    dispatch:  React.Dispatch<ActionType>;
}

export const TaskListContext = createContext<ITaskListContext>({
    state: {tasks: []},
    dispatch: () => {}
});