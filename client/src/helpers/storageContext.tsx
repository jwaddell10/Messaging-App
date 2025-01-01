//storage context so I can pass around localstorage values

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface StorageContextType {
	token: string | null;
	setToken: (arg0: string) => void;
	loggedInUserId: string | null;
	setLoggedInUserId: (arg0: string) => void;
	username: string | null;
	setUsername: (arg0: string) => void;
}

//needs object with token, id, and username
export const StorageContext = createContext<StorageContextType>({
	token: localStorage.getItem("token"),
	setToken: (token) => localStorage.setItem("token", token),
	loggedInUserId: localStorage.getItem("id"),
	setLoggedInUserId: (id) => localStorage.setItem("id", id),
	username: localStorage.getItem("username"),
	setUsername: (username) => localStorage.setItem("username", username),
});

export const StorageProvider = (props: { children: ReactNode }) => {
	const [token, setToken] = useState("");
	const [loggedInUserId, setLoggedInUserId] = useState("");
	const [username, setUsername] = useState("");

	useEffect(() => {
		const JWTToken = localStorage.getItem("JWTToken")
		if (JWTToken) {
			setToken(JWTToken)
		}
	}, [token])

	return (
		<StorageContext.Provider
			value={{ token, setToken, loggedInUserId, setLoggedInUserId, username, setUsername }}
		>
			{props.children}
		</StorageContext.Provider>
	);
};

export const useStorageContext = () => useContext(StorageContext);
