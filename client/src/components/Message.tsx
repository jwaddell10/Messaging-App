import useFetchMessages from "../helpers/useFetchMessages";

export default function Message() {
	const token = localStorage.getItem("token");
    const id = localStorage.getItem("id")
    console.log(token, 'token', id, 'id')
	useFetchMessages(id, token);
	return <>Message</>;
}
