import { useStorageContext } from "../helpers/storageContext";
import useFetchMessages from "../helpers/useFetchMessages";
import MessageForm from "./MessageForm";
import "../Styles/Message.css";
import { useParams } from "react-router";
import DisplayMessages from "./DisplayMessages";

interface Messages {
    id: number,
    text: string,
    createdAt: number;
}

export default function Message() {
	const { id } = useParams();
	const { loggedInUserId, token } = useStorageContext();
	const { messages } = useFetchMessages(loggedInUserId ?? "", id ?? "", token ?? "");
//check flow of page
    if (!id || !token) {
		return <p>Click on a user to load messages</p>;
	}

	return (
		<section className="messages-section">
			<DisplayMessages messages={messages} />
			<MessageForm />
		</section>
	);
}
