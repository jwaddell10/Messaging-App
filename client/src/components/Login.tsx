import { useState, ChangeEvent, FormEvent } from "react";
import Submit from "../Submit";

interface LogInFormData {
	username: string;
	password: string;
}

export default function Login() {
	const [formData, setFormData] = useState<LogInFormData>({
		username: "",
		password: "",
	});

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
				`${import.meta.env.VITE_API_URL}/login`
			);
			const data = await response.json();
			console.log(data, "data for login");
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				throw error;
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
			{error}
		</form>
	);
}
