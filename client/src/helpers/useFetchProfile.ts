import { useEffect, useState } from "react";

interface UserProfile {
	id: number;
	bio: string;
	name: string;
}

export default function useFetchProfile(id: string) {
	const [profile, setProfile] = useState<UserProfile>();
	const [error, setError] = useState<string | null>(null);

	const fetchProfile = async () => {
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/user/${id}`
			);
			const data = await response.json();
			if (data.message) {
				setError(data.message);
			} else if (data.profile) {
				setProfile(data.profile);
			}
		} catch (error) {
			setError(
				error instanceof Error
					? error.message
					: "Unknown error occurred."
			);
		}
	};

	useEffect(() => {
		fetchProfile();
	}, [id]);

	return { profile, error, refetchProfile: fetchProfile };
}
