import "./App.css";
import Router from "./Routes.tsx";
import { createContext, useState, useEffect } from "react";
import tokenActive from "./helpers/tokenActive";

export const AuthContext = createContext<{
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const JWTToken = localStorage.getItem("token");

		if (JWTToken) {
			if (tokenActive(JWTToken) === true) {
				setIsLoggedIn(true);
			} else if (tokenActive(JWTToken) === false) {
				setIsLoggedIn(false);
			}
		}
	}, []);

	return (
		<>
			<Router isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
		</>
	);
}
