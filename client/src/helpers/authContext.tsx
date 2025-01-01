import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
	user: boolean;
	setUser: (arg0: boolean) => void;
	login: () => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	user: false,
	login: () => {},
	logout: () => {},
	setUser: () => {},
});

export const AuthProvider = (props: { children: ReactNode }) => {
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const [user, setUser] = useState(false);

	const login = () => {
		setUser(true);
		setRefreshTrigger((prevState) => prevState + 1);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("id");
		localStorage.removeItem("username");
		setUser(false);
	};

	return (
		<AuthContext.Provider value={{ user, setUser, login, logout }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
