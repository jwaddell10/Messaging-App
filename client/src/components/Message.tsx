import { useStorageContext } from "../helpers/storageContext";
import useFetchMessages from "../helpers/useFetchMessages";
import MessageForm from "./MessageForm";
import "../Styles/Message.css"

interface Message {
	text: string;
}

export default function Message() {
	const { id, token } = useStorageContext();
	const { messages } = useFetchMessages(id ?? "", token ?? "");

	if (!id || !token) {
		return <p>Error: cannot load messages</p>;
	}
	console.log(messages);

	return (
		<section className="messages-section">
			{messages && messages.length > 0 ? (
				<ul>
					{messages.map((message: Message, index: number) => (
						<li key={index}>{message.text}</li>
					))}
				</ul>
			) : (
				<p>No messages available</p>
			)}
			<MessageForm />
		</section>
	);
}
