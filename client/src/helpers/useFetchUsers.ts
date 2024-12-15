import { useState, useEffect } from "react";

interface User {
    id: number;
	name: string;
}

export default function useFetchUsers() {
	const [users, setUsers] = useState<User[]>([]);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/user`
			);
			const data = await response.json();
			if (data.message) {
				setError(data.message);
			}

			if (data.users) {
				setUsers(data.users);
			}
		};
		fetchUsers();
	}, []);

	return { users, error };
}
