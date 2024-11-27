import TaskItem from "./task-item.tsx";
import ITask from "../dto/ITask";


export default function TaskList({tasks, toggleTaskDone}:{ tasks:ITask[], toggleTaskDone: (taskId: string) => void }) {
    return (
        <div className={"grid grid-cols-4 gap-4"}>
            {tasks.map((task: ITask, index) =>
                <TaskItem key={index} task={task} toggleTaskDone={toggleTaskDone} />
            )}
        </div>
    )
}