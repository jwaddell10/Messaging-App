//storage context so I can pass around localstorage values

import { createContext, ReactNode, useContext, useState } from "react";

interface StorageContextType {
	token: string | null;
	setToken: (arg0: string) => void;
	id: string | null;
	setId: (arg0: string) => void;
	username: string | null;
	setUsername: (arg0: string) => void;
}

//needs object with token, id, and username
export const StorageContext = createContext<StorageContextType>({
	token: "",
	setToken: (token) => localStorage.setItem("token", token),
	id: "",
	setId: (id) => localStorage.setItem("id", id),
	username: "",
	setUsername: (username) => localStorage.setItem("username", username),
});

export const StorageProvider = (props: { children: ReactNode }) => {
	const [token, setToken] = useState("");
	const [id, setId] = useState("");
	const [username, setUsername] = useState("");

	return (
		<StorageContext.Provider
			value={{ token, setToken, id, setId, username, setUsername }}
		>
			{props.children}
		</StorageContext.Provider>
	);
};

export const useStorageContext = () => useContext(StorageContext);
