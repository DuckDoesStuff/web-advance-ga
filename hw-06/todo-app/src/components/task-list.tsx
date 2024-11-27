import TaskItem from "./task-item.tsx";
import {useContext} from "react";
import {TaskListContext} from "../contexts/TaskListContext.ts";
import ITask from "../dto/ITask";


export default function TaskList() {
    const { state } = useContext(TaskListContext);
    return (
        <div className={"grid grid-cols-4 gap-4"}>
            {state.tasks.map((task: ITask, index) =>
                <TaskItem key={index} task={task}/>
            )}
        </div>
    )
}