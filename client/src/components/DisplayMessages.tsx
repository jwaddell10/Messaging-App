import { useParams } from "react-router";
import "../Styles/DisplayMessages.css";
import { useStorageContext } from "../helpers/storageContext";

interface Messages {
    length: number;
    map(arg0: (message: Messages) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
	receivedMessages: Array<Messages>;
	sentMessages: Array<Messages>;
}

interface Messages {
	id: number;
	text: string;
	createdAt: number;
    senderId: string;
}

export default function DisplayMessages({ messages }: { messages: Messages }) {
    console.log(messages, 'messages')
	const { loggedInUserId } = useStorageContext();

	return (
		<ul className="messages">
			{messages.length > 0 ?
				messages.map((message: Messages) => (
					<li key={message.id}>
                        {loggedInUserId == message.senderId ? <p className="logged-in-user-messages">{message.text}</p> : <p>{message.text}</p>}
						{/* <p>{message.text}</p> */}
					</li>
				)) : (
                    <h1>No messages. Be the first to send a message</h1>
                )}
		</ul>
	);
}
