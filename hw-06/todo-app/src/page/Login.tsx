import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { loginAccount } from "../api/auth.api";
import Cookies from 'js-cookie';

interface FormData {
	username: string;
	password: string;
}

function Login() {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormData>();
	const navigate = useNavigate();

	const onSubmit = async (data: any) => {
		const result = await loginAccount(data);
		if (!result) return;
		if (result.error) {
			setError("username", {
				type: "server",
				message: result.error,
			});
		} else {
			Cookies.set("access_token", result.data.access_token, { expires: 1 / 1440 }); // 60 seconds
			Cookies.set("refresh_token", result.data.refresh_token, { expires: 1 / 24 }); // 1 hour
			navigate("/")
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
				<h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
					Login
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
							{...register("password", { required: "Password is required" })}
							type="password"
							id="password"
							className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							placeholder="Enter your password"
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password.message}</p>
						)}
					</div>
					<button
						type="submit"
						className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						Login
					</button>
				</form>
				<p className="mt-4 text-sm text-center text-gray-600">
					Don’t have an account?{" "}
					<Link to="/register" className="text-blue-500 hover:underline">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
