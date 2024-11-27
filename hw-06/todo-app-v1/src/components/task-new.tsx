import {useState} from "react";
import ITask from "../dto/ITask";

export default function TaskNew({createTask} : {createTask: (newTask: ITask) => void}) {
    const [task, setTask] = useState<ITask>({
        title: "",
        description: "",
        done: false,
        id: ""
    });

    const handleCreateTask = async () => {
        if(task.title != "" && task.description != "") {
            setTask({...task, done: false, id: Math.random().toString(36).substring(2, 10)});
            createTask(task);
            setTask({...task, title: "", description: ""})
        }
    }

    return (
        <div className={"flex flex-col gap-4 w-1/2"}>
            <input
                onChange={(e) => setTask({...task, title: e.target.value})}
                placeholder={"Task title"}
                value={task.title}
                className={"bg-white px-5 py-2 rounded-xl outline-none text-lg placeholder:text-deepGreen placeholder:italic"}/>
            <textarea
                onChange={(e) => setTask({...task, description: e.target.value})}
                value={task.description}
                placeholder={"Task description"}
                className={"bg-white max-h-60 min-h-60 px-5 py-2 rounded-xl outline-none text-lg placeholder:text-deepGreen placeholder:italic"}/>
            <button
                onClick={handleCreateTask}
                className={"bg-lightGreen w-56 rounded-lg py-2 font-bold hover:bg-opacity-30 hover:text-white"}>Add
                task
            </button>
        </div>
    )
}