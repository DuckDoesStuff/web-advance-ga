import { createBrowserRouter } from "react-router";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";

export const routes = createBrowserRouter([
	{
		path: "",
		element: <Home />
	},
	{
		path: "login",
		element: <Login />
	},
	{
		path: "register",
		element: <Register />
	}
])