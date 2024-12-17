import { useState, useEffect } from "react";

export default function useFetchMessages(id, token) {
	const [messages, setMessages] = useState({});
	const [error, setError] = useState<unknown>(null);

	try {
		useEffect(() => {
			const fetchMessages = async () => {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/message/${id}`,
					// {
					// 	method: "GET",
					// 	headers: {
					// 		Authorization: `Bearer ${token}`,
					// 	},
					// }
				);

				const data = await response.json();
				console.log(data, "this is data from fetch");
			};
			fetchMessages();
		}, [id, token]);
	} catch (error: unknown) {
		setError(error);
	}
}
