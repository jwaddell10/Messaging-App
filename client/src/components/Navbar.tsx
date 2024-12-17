import { Outlet, Link } from "react-router";
import { AuthContext } from "../helpers/authContext";
import { useContext } from "react";

export default function NavBar() {

	const { user, logout } = useContext(AuthContext)
	const id = localStorage.getItem("id")
	return (
		<>
			NavBar
			<Link to="/">Home</Link>
			{user ? (
				<div>
					<Link to={`/profile/${id}`}>Profile</Link>
					<Link to="/" onClick={logout}>
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
