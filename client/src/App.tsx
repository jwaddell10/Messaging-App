import "./App.css";
import Router from "./Routes.tsx";
import { useState, useEffect } from "react";
import tokenActive from "./helpers/tokenActive";

// export const AuthContext = createContext<{
// 	isLoggedIn: boolean;
// 	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
// } | null>(null);

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		const JWTToken = localStorage.getItem("token") ?? "";
		setIsLoggedIn(tokenActive(JWTToken));
	}, []);

	return (
		<>
			<Router isLoggedIn={isLoggedIn} />
		</>
	);
}
