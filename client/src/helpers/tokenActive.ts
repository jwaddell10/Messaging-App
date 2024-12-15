import { jwtDecode } from "jwt-decode";

interface DecodedToken {
	exp?: number;
}

export default function tokenActive(token: string): boolean {
	try {
		const decodedToken: DecodedToken = jwtDecode(token);

		if (!decodedToken.exp) {
			return false;
		}

		const isTokenValid = Date.now() <= decodedToken.exp * 1000;
console.log(isTokenValid, 'istoken valid')
		if (!isTokenValid) {
			localStorage.removeItem("token");
		}

		return isTokenValid;
	} catch (error) {
		console.error("Error decoding token:", error);
		return false;
	}
}
