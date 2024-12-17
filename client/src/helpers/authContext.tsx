import { createContext, useState, useContext, ReactNode } from "react";

interface User {
	id: string;
	username: string;
	token: string;
}

interface AuthContextType {
	user: boolean;
	setUser: (arg0: boolean) => void;
	login: (user: User) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	user: false,
	login: () => {},
	logout: () => {},
	setUser: () => {},
});

export const AuthProvider = (props: { children: ReactNode }) => {
	const [user, setUser] = useState(false);

	const login = (user: User) => {
		localStorage.setItem("id", user.id);
		localStorage.setItem("username", user.username);
		localStorage.setItem("token", user.token);
		setUser(true);
	};

	const logout = () => {
		// Perform logout logic, then set user to null
		localStorage.removeItem("id");
		localStorage.removeItem("username");
		localStorage.removeItem("token");
		setUser(false);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
