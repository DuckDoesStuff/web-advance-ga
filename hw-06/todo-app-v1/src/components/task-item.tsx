import {FaCircleCheck as Check, FaRegCircleCheck as UnCheck} from "react-icons/fa6";
import ITask from "../dto/ITask";

function CheckButton({checked, onClick}:{checked: boolean, onClick: () => void}) {
    return (
        <button onClick={onClick}>
            {checked ? <Check className={"font-bold text-2xl"}/> : <UnCheck className={"font-bold text-2xl"}/>}
        </button>
    )
}

export default function TaskItem({task, toggleTaskDone}: { task:ITask, toggleTaskDone: (taskId: string) => void }) {
    const divStyle =
        task.done ?
            "p-2 border-2 border-lightGreen h-52 rounded-xl bg-lightGreen" :
            "p-2 border-2 border-normalSkin h-52 rounded-xl bg-normalSkin";
    return (
        <div className={divStyle}>
            <div className={"flex items-center justify-between mr-5"}>
                <p className={"text-deepGreen text-lg font-bold"}>{task.title}</p>
                <CheckButton checked={task.done} onClick={() => toggleTaskDone(task.id)} />
            </div>
            <p className={"text-xl italic mt-5"}>{task.description}</p>
        </div>
    )
}