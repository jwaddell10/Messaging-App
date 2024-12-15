import { Outlet, Link } from "react-router";
import useFetchUsers from "../helpers/useFetchUsers";
// import { useContext } from "react";
// import { AuthContext } from "../App";

export default function NavBar({isLoggedIn, setIsLoggedIn}) {
	const { users, error } = useFetchUsers();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("username");
		setIsLoggedIn(false);
	};
	return (
		<>
			NavBar
			<Link to="/">Home</Link>
			{isLoggedIn ? (
				<div>
					<Link to={`/profile/${users.id}`}>Profile</Link>
					<Link to="/" onClick={handleLogout}>
						Logout
					</Link>
				</div>
			) : (
				<Link to="/">Login</Link>
			)}
			<Outlet />
		</>
	);
}
