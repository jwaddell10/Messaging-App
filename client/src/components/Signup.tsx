import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router";
import Submit from "../Submit";
import { useNavigate } from "react-router";
import { useStorageContext } from "../helpers/storageContext";

interface SignUpFormData {
	username: string;
	password: string;
	confirmPassword: string;
}

export default function Signup() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<SignUpFormData>({
		username: "",
		password: "",
		confirmPassword: "",
	});

	const { setToken, setLoggedInUserId, setUsername } = useStorageContext();

	const [error, setError] = useState<string>("");

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
			const data = await response.json();

			if (data.token) {
				setToken(data.token);
				setLoggedInUserId(data.id)
				setUsername(data.username)
				navigate("/");
			} else setError(data.message || "Signup failed. Please try again.");
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				throw error;
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="authentication-form">
			<label htmlFor="username">Username:</label>
			<input
				type="text"
				name="username"
				value={formData.username}
				onChange={handleChange}
				aria-label="Enter your username"
				required
			/>
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				name="password"
				value={formData.password}
				onChange={handleChange}
				aria-label="Enter your password"
				required
			/>
			<label htmlFor="confirmPassword">Confirm Password:</label>
			<input
				autoComplete="current-password"
				type="password"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={handleChange}
				aria-label="Confirm your password"
				required
			/>
			<Submit text="Sign Up" />
			<div className="redirect-to-login">
				Have an account? Login <Link className="form-link-styles" to="/">here</Link>
			</div>
			{error}
		</form>
	);
}
