import "./App.css";
import Router from "./Routes.tsx";
import { useEffect } from "react";
import tokenActive from "./helpers/tokenActive";
import { useAuth } from "./helpers/authContext.tsx";

export default function App() {
	// localStorage.clear();
	const { user, setUser } = useAuth()
	console.log(user, setUser, 'setuser in app from useauth')


	useEffect(() => {
		const JWTToken = localStorage.getItem("token") ?? "";
		// console.log(JWTToken, 'token')
		setUser(tokenActive(JWTToken));
	}, [setUser, user]);
	return (
		<>
			<Router />
		</>
	);
}
