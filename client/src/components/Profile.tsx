import { useParams } from "react-router";
import { ChangeEvent, FormEvent, useState } from "react";
import useFetchProfile from "../helpers/useFetchProfile";

export default function Profile() {
	const { id } = useParams();
	if (id === undefined) {
		throw new Error("An error has occurred, try again later");
	}
	const { profile, error, refreshTrigger, setRefreshTrigger } =
		useFetchProfile(id);
	const [formBio, setFormBio] = useState("");

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setFormBio(event.target.value);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const token = localStorage.getItem("token");
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/user/${id}`,
				{
					method: "PUT",
					body: JSON.stringify({bio: formBio}),
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json"
					},
				}
			);
			const data = await response.json();
			console.log(data, "data from put");
			setFormBio("");
			setRefreshTrigger(!refreshTrigger);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message);
			} else throw error;
		}
	};

	return (
		<div>
			{profile && (
				<form onSubmit={handleSubmit}>
					<label>Username: {profile.name}</label>
					<label>About me: {profile.bio}</label>
					<textarea
						name="bio"
						value={formBio}
						onChange={handleChange}
					/>
					<button>submit</button>
				</form>
			)}
		</div>
	);
}
