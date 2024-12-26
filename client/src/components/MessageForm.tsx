import { ChangeEvent, useState } from "react";
import postMessage from "../helpers/postMessage";
import { useStorageContext } from "../helpers/storageContext";
import "../Styles/MessageForm.css";
import { useParams } from "react-router";

export default function MessageForm() {
	const [message, setMessage] = useState("");
	const { id } = useParams();
	const { loggedInUserId, token } = useStorageContext();
	if (id === undefined) return;
	if (loggedInUserId === null || token === null) {
		throw new Error("Id or token is null");
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.target.value);
	};

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event?.preventDefault();
		await postMessage({ loggedInUserId, id, token, message });
	};

	return (
		<form className="message-form" onSubmit={handleSubmit}>
			<input
				className="message-form-input"
				type="text"
				name="message"
				value={message}
				onChange={handleChange}
			/>
			<button type="submit">Submit</button>
		</form>
	);
}
