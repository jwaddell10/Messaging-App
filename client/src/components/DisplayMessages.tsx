import { useEffect, useState } from "react";

interface Messages {
    receivedMessages: Array<Messages>;
    sentMessages: Array<Messages>;
}

interface Messages {
    id: number,
    text: string,
    createdAt: number;
}

export default function DisplayMessages({ messages }: { messages: Messages }) {
    const { sentMessages, receivedMessages } = messages;

    const [sortedMessages, setSortedMessages] = useState([])

    useEffect(() => {
        if (sentMessages) {
            const allMessages = [...sentMessages, ...receivedMessages]
            const date = allMessages.sort((a, b) => a.createdAt - b.createdAt)
            setSortedMessages(date)
        }
    }, [receivedMessages, sentMessages])

    //goal here? combine them and then sort by date

	return (
		<ul>
			 {sortedMessages && sortedMessages.map((message, index) => (
                <li key={message.id}>
                    <p>{message.text}</p>
                </li>
            ))}
		</ul>
	);
}
