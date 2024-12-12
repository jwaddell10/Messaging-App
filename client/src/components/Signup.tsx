import { useState, ChangeEvent, FormEvent } from "react";
import Submit from "../Submit";

interface SignUpFormData {
	username: string;
	password: string;
	confirmPassword: string;
}

export default function Signup() {
	const [formData, setFormData] = useState<SignUpFormData>({
		username: "",
		password: "",
		confirmPassword: "",
	});

	const [error, setError] = useState("");

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
			if (formData.password !== formData.confirmPassword) {
				setError("Passwords do not match");
				return;
			}
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/auth/signup`,
				{
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-type": "application/json",
					},
				}
			);
			console.log(response, 'response')
			const data = await response.json();
			console.log(data, "this is data for signup");
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
			<label htmlFor="confirmPassword">Confirm Password:</label>
			<input
				type="password"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={handleChange}
				required
			/>
			<Submit text="Sign Up" />
			{error}
		</form>
	);
}
