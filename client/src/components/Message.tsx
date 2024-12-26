import { useStorageContext } from "../helpers/storageContext";
import useFetchMessages from "../helpers/useFetchMessages";
import MessageForm from "./MessageForm";
import "../Styles/Message.css";
import { useParams } from "react-router";
import DisplayMessages from "./DisplayMessages";

interface Receiver {
	text: string;
}

interface Sender {
	text: string;
}

interface Message {
	receiver: Receiver;
	sender: Sender;
	text: string;
}

export default function Message() {
	const { id } = useParams();
	const { loggedInUserId, token } = useStorageContext();
	const { messages } = useFetchMessages(loggedInUserId ?? "", token ?? "");
	console.log(messages, "messages in message component");
	if (!id || !token) {
		return <p>Error: cannot load messages</p>;
	}

	return (
		<section className="messages-section">
			<DisplayMessages messages={messages} />
			<MessageForm />
		</section>
	);
}
