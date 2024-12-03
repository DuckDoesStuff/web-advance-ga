import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { createAccount } from "../api/auth.api";

interface FormData {
	username: string
	password: string
	confirmPassword: string
}

function Register() {
	const {
		register,
		handleSubmit,
		watch,
		setError,
		formState: { errors },
	} = useForm<FormData>();

	const navigate = useNavigate();

	const onSubmit = async (data: FormData) => {
		const result = await createAccount({username: data.username, password: data.password});
		if (result && result.error) {
			setError("username", {
				type: "server",
				message: result.error
			})
		} else {
			navigate("/login")
		}
	};

	const password = watch("password");

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
				<h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
					Register
				</h2>
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-600"
						>
							Username
						</label>
						<input
							{...register("username", { required: "Username is required" })}
							id="username"
							className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							placeholder="Enter your username"
						/>
						{errors.username && (
							<p className="text-red-500 text-sm">{errors.username.message}</p>
						)}
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-600"
						>
							Password
						</label>
						<input
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Passwords must have atleast 6 characters",
								},
							})}
							type="password"
							id="password"
							className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							placeholder="Enter your password"
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password.message}</p>
						)}
					</div>
					<div>
						<label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-600"
						>
							Confirm Password
						</label>
						<input
							{...register("confirmPassword", {
								required: "Password is required",
								minLength: {
									value: 6,
									message: "Passwords must have atleast 6 characters",
								},
								validate: (value) => value === password || "Password do not match"
							})}
							type="password"
							id="confirmPassword"
							className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							placeholder="Confirm your password"
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>
					<button
						type="submit"
						className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Register
					</button>
				</form>
				<p className="mt-4 text-sm text-center text-gray-600">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
