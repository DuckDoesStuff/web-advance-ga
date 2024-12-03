import { useContext } from "react";
import ITask from "../dto/ITask";
import { TaskListContext } from "../contexts/TaskListContext.ts";
import { createTask } from "../api/task.api.ts";
import { useForm } from "react-hook-form";

interface FormData {
    title: string,
    description: string
}

export default function TaskNew() {
	const { dispatch } = useContext(TaskListContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const handleCreateTask = async (data: FormData) => {
        const newTask: ITask = {
            ...data,
            id: Math.random().toString(36).substring(2, 9),
            done: false
        }
        await createTask(newTask);
        dispatch({ type: "add", payload: newTask });
	};

	return (
		<div>
			<form
				className={"flex flex-col gap-4 w-1/2"}
				onSubmit={handleSubmit(handleCreateTask)}
			>
				<div>
                    {errors.title && <p className={"text-white italic text-lg mb-1"}>{errors.title.message}</p>}
					<input
						{...register("title", { required: "Title is required" })}
						placeholder={"Task title"}
						className={
							"bg-white w-full px-5 py-2 rounded-xl outline-none text-lg placeholder:text-deepGreen placeholder:italic"
						}
					/>
				</div>
				<div>
                    {errors.description && <p className={"text-white italic text-lg mb-1"}>{errors.description.message}</p>}
                    <textarea
						{...register("description", {
							required: "Description is required",
						})}
						placeholder={"Task description"}
						className={
							"bg-white w-full max-h-60 min-h-60 px-5 py-2 rounded-xl outline-none text-lg placeholder:text-deepGreen placeholder:italic"
						}
					/>
				</div>
				<button
					type={"submit"}
					className={
						"bg-lightGreen w-56 rounded-lg py-2 font-bold hover:bg-opacity-30 hover:text-white"
					}
				>
					Add task
				</button>
			</form>
		</div>
	);
}
