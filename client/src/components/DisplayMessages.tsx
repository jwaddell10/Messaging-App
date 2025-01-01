import "../Styles/DisplayMessages.css";
import { useStorageContext } from "../helpers/storageContext";
import convertDate from "../helpers/convertDate";

interface sender {
	name: string;
}

interface receiver {
	name: string;
}
interface Messages {
	length: number;
	map(
		arg0: (message: Messages) => import("react/jsx-runtime").JSX.Element
	): import("react").ReactNode;
	receivedMessages: Array<Messages>;
	sentMessages: Array<Messages>;
	id: number;
	text: string;
	createdAt: number;
	senderId: string;
	sender: sender;
	receiver: receiver;
}

export default function DisplayMessages({ messages }: { messages: Messages }) {
	const { loggedInUserId } = useStorageContext();

	return (
		<ul className="messages">
			{messages.length > 0 ? (
				messages.map((message: Messages) => (
					<li key={message.id}>
						{loggedInUserId == message.senderId ? (
							<div className="sent-messages">
								<div className="sent-messages-content-container">
									<p>{convertDate(message.createdAt)}</p>
									<p>{message.text}</p>
								</div>
							</div>
						) : (
							<div className="received-messages">
								<div className="received-messages-content-container">
									<p>Username: {message.sender.name}</p>
									<p>{convertDate(message.createdAt)}</p>
									<p>{message.text}</p>
								</div>
							</div>
						)}
					</li>
				))
			) : (
				<h1 style={{color: "white"}}>No messages. Be the first to send a message</h1>
			)}
		</ul>
	);
}
