import "./App.css";
import Router from "./Routes.tsx";
import { useState, useEffect } from "react";
import tokenActive from "./helpers/tokenActive";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	// localStorage.clear();
	useEffect(() => {
		const JWTToken = localStorage.getItem("token") ?? "";
		setIsLoggedIn(tokenActive(JWTToken));
	}, [isLoggedIn]);
	return (
		<>
			<Router isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
		</>
	);
}
