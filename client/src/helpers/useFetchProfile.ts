import { useEffect, useState } from "react";

interface UserProfile {
    id: number;
    bio: string;
    name: string;
}

export default function useFetchProfile(id: string) {
	const [profile, setProfile] = useState<UserProfile>();
    const [refreshTrigger, setRefreshTrigger] = useState(false)
	const [error, setError] = useState<unknown>(null);
	try {
		useEffect(() => {
			const fetchData = async () => {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/user/${id}`
				);
				const data = await response.json();
				if (data.message) {
					setError(data.message);
				} else if (data.profile) {
					setProfile(data.profile);
				}
			};
			fetchData();
		}, [id, refreshTrigger]);
	} catch (error: unknown) {
		setError(error);
	}

	return {profile, error, refreshTrigger, setRefreshTrigger }
}
