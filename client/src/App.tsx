import "./App.css";
import Router from "./Routes.tsx";
import { useEffect } from "react";
import tokenActive from "./helpers/tokenActive";
import { useAuth } from "./helpers/authContext.tsx";
import { useStorageContext } from "./helpers/storageContext.tsx";

export default function App() {
	// localStorage.clear();
	const { user, setUser } = useAuth();
	const { token } = useStorageContext();

	useEffect(() => {
		const JWTToken = token ?? "";
		setUser(tokenActive(JWTToken));
	}, [setUser, token, user]);
	return (
		<div className="page-container">
			<Router />
		</div>
	);
}
