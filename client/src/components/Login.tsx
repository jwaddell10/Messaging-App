import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import Submit from "../Submit";

interface LogInFormData {
	username: string;
	password: string;
}

export default function Login() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<LogInFormData>({
		username: "",
		password: "",
	});

	const [error, setError] = useState<string | null>("");

	// Generics
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
			console.log(data, 'this is data login')
			if (data.token) {
				localStorage.setItem("token", data.token);
				navigate("/");
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
