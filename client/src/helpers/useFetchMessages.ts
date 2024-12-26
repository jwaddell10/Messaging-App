import { useState, useEffect } from "react";

export default function useFetchMessages(id: string | number, token: string) {
    console.log(typeof id, `${id} in useFetch`)
	const [messages, setMessages] = useState([]);
	const [error, setError] = useState<unknown>(null);

	const fetchMessages = async (id: string | number, token: string) => {
        if (!id || !token) return;
		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/message/${id}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
            console.log(data, 'data')
			setMessages(data.messages);
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		if (!id || !token) return;
		fetchMessages(id, token);
	}, [id, token]);

	return { messages, error, refetchMessages: fetchMessages };
}
