import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router";
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
		console.log('submit runs');
		event.preventDefault();
		try {
		  console.log(`${import.meta.env.VITE_API_URL}/auth/login`);
		  const response = await fetch(
			`${import.meta.env.VITE_API_URL}/auth/login`,
			{
			  method: "POST",
			  body: JSON.stringify(formData),
			  headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			  },
			}
		  );
		  
		  if (!response.ok) {
			throw new Error(`HTTP Error, status ${response.status}`);
		  }
		  
		  console.log(response, "response login");
		  
		  const data = await response.json();
		  console.log(data, "data for login");
		  
		  // Handle successful login here (e.g., store token, redirect)
		  
		} catch (error) {
		  if (error instanceof Error) {
			setError(error.message);
		  } else {
			setError('An unknown error occurred');
		  }
		  console.error('Login error:', error);
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
