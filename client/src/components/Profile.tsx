import { ChangeEvent, FormEvent, useState } from "react";
import useFetchProfile from "../helpers/useFetchProfile";
import updateProfile from "../helpers/updateProfile";
import "../Styles/ProfileForm.css"

export default function Profile() {
	const id = localStorage.getItem("id");
	const token = localStorage.getItem("token");
	if (id === null || token === null) {
		throw new Error("id is null");
	}
	const { profile, error, refetchProfile } = useFetchProfile(id);
	const [formBio, setFormBio] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setFormBio(event.target.value);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		setSubmitError(null);

		try {
			updateProfile(
				`${import.meta.env.VITE_API_URL}/user/${id}`,
				formBio,
				token
			).then(() => {
				setFormBio("");
				refetchProfile();
			});
		} catch (error) {
			console.log(error, "Error updating profile");
			setSubmitError("Failed to load profile. Please try again");
		}
	};

	if (error) {
		return <div>Error loading profile: {error}</div>;
	}

	return (
		<div>
			{profile && (
				<form className="profile-form" onSubmit={handleSubmit}>
					<label>Username: {profile.name}</label>
					<label>About me: {profile.bio}</label>
					<textarea
						name="bio"
						value={formBio}
						onChange={handleChange}
						disabled={isLoading}
					/>
					<button type="submit" disabled={isLoading}>
						{isLoading ? "Submitting" : "Submit"}
					</button>
					{submitError && (
						<p style={{ color: "red" }}>{submitError}</p>
					)}
				</form>
			)}
		</div>
	);
}
