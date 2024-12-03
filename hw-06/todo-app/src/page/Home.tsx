import { useContext, useEffect } from "react";
import { TaskListContext } from "../contexts/TaskListContext";
import { getAllTasks } from "../api/task.api";
import TaskNew from "../components/task-new";
import TaskFilter from "../components/task-filter";
import TaskList from "../components/task-list";


function Home() {
    const { dispatch } = useContext(TaskListContext);
    useEffect(() => {
        getAllTasks().then((fetchedTasks) => {
            dispatch({type: "update", payload: fetchedTasks})
        })
    }, [])
    
    return (
        <div className="bg-deepGreen p-10 min-h-screen">
            <TaskNew/>

            <div className={"flex flex-col gap-8 mt-8"}>
                <TaskFilter/>
                <TaskList/>
            </div>
        </div>
    )
}

export default Home
