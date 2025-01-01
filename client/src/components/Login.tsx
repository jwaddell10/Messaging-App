import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router";
import Submit from "../Submit";
import { useAuth } from "../helpers/authContext";
import { useStorageContext } from "../helpers/storageContext";
interface LogInFormData {
	username: string;
	password: string;
}

export default function Login() {
	const [formData, setFormData] = useState<LogInFormData>({
		username: "",
		password: "",
	});
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const { login } = useAuth();
	const { setToken, setLoggedInUserId, setUsername } = useStorageContext();

	const [error, setError] = useState<string | null>("");

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/auth/login`,
				{
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP Error, status ${response.status}`);
			}

			const data = await response.json();

			if (data.token) {
				setToken(data.token);
				setLoggedInUserId(data.id);
				setUsername(data.username);
				login();
			} else setError(data.message);
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="username">Username:</label>
			<input
				type="text"
				name="username"
				value={formData.username}
				onChange={handleChange}
				required
			/>
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				required
			/>
			<Submit text="Log In" />
			<div className="redirect-to-signup">
				Not a member? Sign up <Link to="/signup">here</Link>
			</div>
			{error}
		</form>
	);
}
