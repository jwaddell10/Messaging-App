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
                            <div className="logged-in-user-messages">
                                <h1>Me</h1>
                                <p>{message.text}</p>
                                <p>{convertDate(message.createdAt)}</p>
                            </div>
                        ) : (
                            <div>
                                <h1>{message.sender.name}</h1>
                                <p>{message.text}</p>
                                <p>{convertDate(message.createdAt)}</p>
                            </div>
                        )}
                    </li>
                ))
            ) : (
                <h1>No messages. Be the first to send a message</h1>
            )}
        </ul>
    );
}

