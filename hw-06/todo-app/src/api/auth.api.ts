import axios from "axios";

export async function createAccount(data : {username: string, password: string}): Promise<any | {error: string}> {
	try {
		const result = await axios.post("/auth/register", data);
		console.log(result);
		return result;
	} catch (error: any) {
		if (error.response && error.response.status === 400) {
			return error.response.data
		} else {
			console.error("An unexpected error occurred:", error.message);
		}
	}
}

export async function loginAccount(data: {username: string, password: string}): Promise<any  | {error: string} | {access_token: string, refresh_token: string}> {
	try {
		const result: {
			access_token: string,
			refresh_token: string
		} = await axios.post("/auth/login", data);
		console.log(result);
		return result;
	} catch (error: any) {
		if (error.response && error.response.status === 400) {
			return error.response.data
		} else {
			console.error("An unexpected error occurred:", error.message);
		}
	}
}

export async function refreshToken() {
	
}