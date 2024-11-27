import TaskNew from "./components/task-new.tsx";
import TaskList from "./components/task-list.tsx";
import TaskFilter from "./components/task-filter.tsx";

function App() {
    return (
        <div className={"p-10 bg-deepGreen min-h-[100vh]"}>
            <TaskNew/>

            <div className={"flex flex-col gap-8 mt-8"}>
                <TaskFilter/>
                <TaskList/>
            </div>
        </div>
    )
}

export default App
