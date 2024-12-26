interface Messages {
	receiver: object;
	sender: object;
}

export default function DisplayMessages({ messages }: { messages: Messages[] }) {
	console.log(messages, "messages in display messages");
	
	return (
		<ul>
			{/* {messages.map((message, index) => (
				<li key={index}>
					<p>Receiver: {JSON.stringify(message.receiver)}</p>
					<p>Sender: {JSON.stringify(message.sender)}</p>
				</li>
			))} */}
		</ul>
	);
}
