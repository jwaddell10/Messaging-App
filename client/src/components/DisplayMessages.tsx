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

    //goal here? combine them and then sort by date

	return (
		<ul>
			 {messages && messages.map((message, index) => (
                <li key={message.id}>
                    <p>{message.text}</p>
                </li>
            ))}
		</ul>
	);
}
