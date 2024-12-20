export default async function postMessage({
	id,
	token,
	message,
}: {
	id: string;
	token: string;
	message: string;
}) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/message/${id}`,
			{
				method: "POST",
				body: JSON.stringify({message}),
				headers: {
                    "Content-type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await response.json();
		console.log(data, "data from postMessage");
	} catch (error: unknown) {
		console.log(error, "error posting message");
		return error;
	}
}
