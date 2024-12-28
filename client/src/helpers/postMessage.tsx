export default async function postMessage({
	loggedInUserId,
    id,
	token,
	message,
}: {
	loggedInUserId: string;
    id: string;
	token: string;
	message: string;
}) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/message/${loggedInUserId}`,
			{
				method: "POST",
				body: JSON.stringify({message: message, receiverUserId: id}),
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
