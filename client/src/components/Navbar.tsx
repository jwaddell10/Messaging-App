import { Outlet, Link } from "react-router";

export default function NavBar({isLoggedIn, setIsLoggedIn}) {
	const id = localStorage.getItem("id")

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
					<Link to={`/profile/${id}`}>Profile</Link>
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
