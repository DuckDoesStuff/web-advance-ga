import TaskNew from "./components/task-new.tsx";
import TaskList from "./components/task-list.tsx";
import TaskFilter from "./components/task-filter.tsx";
import {useState} from "react";
import ITask from "./dto/ITask";

function App() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);

    const createTask = (newTask: ITask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setFilteredTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const searchTask = (query: string) => {
        if (query.trim() === "") {
            setFilteredTasks(tasks);
            return;
        }

        setFilteredTasks(() =>
            tasks.filter((task) =>
                task.title.toLowerCase().includes(query.toLowerCase())
            )
        );
    };

    const toggleTaskDone = (taskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
            )
        );
        setFilteredTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
            )
        );
    };

    return (
        <div className={"p-10 bg-deepGreen min-h-[100vh]"}>
            <TaskNew createTask={createTask} />

            <div className={"flex flex-col gap-8 mt-8"}>
                <TaskFilter searchTask={searchTask} />
                <TaskList tasks={filteredTasks} toggleTaskDone={toggleTaskDone} />
            </div>
        </div>
    )
}

export default App
