import {useContext} from "react";
import {TaskListContext} from "../contexts/TaskListContext.ts";
import { getAllTasks, getTaskWithTitle } from "../api/task.api.ts";

export default function TaskFilter() {
    const { dispatch } = useContext(TaskListContext);

    const handleSearch = async (title: string) => {
        let tasks;
        if (title == "") 
            tasks = await getAllTasks();
        else
            tasks = await getTaskWithTitle(title);
        dispatch({type: "filter", payload: tasks})
    }

    return (
        <div>
            <input
                onKeyDown={(e) => {
                    if (e.key === "Enter")
                        handleSearch(e.currentTarget.value)
                }}
                placeholder={"Search task"}
                className={"mt-8 bg-lightGreen w-80 px-5 py-2 rounded-xl outline-none text-lg placeholder:text-deepGreen placeholder:italic"}/>
            {/*<h1 className={"mt-2 text-xl text-lightGreen font-bold"}>Filter</h1>*/}
        </div>
    )
}