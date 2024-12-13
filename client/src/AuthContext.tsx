import { createContext, useEffect, useState, useContext } from "react";

const AuthContext = createContext<boolean | null>(null);

const AuthProvider = () => {
	const [user, setUser] = useState<boolean>(false);
	useEffect(() => {
		const JWTToken = localStorage.getItem("token");

		if (JWTToken) {
			console.log("token exists");
			setUser(true);
		}
	}, []);
    console.log(user, 'this is user in auth')

	return { user, setUser };
};

const useAuthContext = () => {
    return useContext(AuthContext)
}

export { AuthProvider, useAuthContext}
