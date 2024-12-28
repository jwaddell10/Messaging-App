import { useState, useEffect } from "react";


export default function useFetchMessages(loggedInUserId: string | number, id: string | number, token: string) {
	const [messages, setMessages] = useState([]);
	const [error, setError] = useState<unknown>(null);

	const fetchMessages = async (loggedInUserId: string | number, id: string | number, token: string) => {
        if (!loggedInUserId || !token) return;
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/message/${loggedInUserId}/${id}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			setMessages(data);
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		if (!loggedInUserId || !token) return;
		fetchMessages(loggedInUserId, id, token);
	}, [loggedInUserId, id, token]);

	return { messages, error, refetchMessages: fetchMessages };
}
