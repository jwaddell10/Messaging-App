import { jwtDecode } from "jwt-decode";

export default function tokenActive(token: string) {
	const decodedToken = jwtDecode(token);

	const { exp } = decodedToken;

	if (exp !== undefined) {
		const currentDate = new Date(Date.now());
		const expirationDate = new Date(exp * 1000);

		if (currentDate <= expirationDate) {
			return true;
		} else {
			localStorage.removeItem("token");
			return false;
		}
	} else throw new Error("expiration date undefined");
}
