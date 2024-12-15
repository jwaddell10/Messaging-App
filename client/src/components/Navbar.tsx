import { Outlet, Link } from "react-router";

export default function NavBar() {
	return (
		<>
			NavBar
			<Link to="/">Home</Link>
			{/* <Link to="/profile/:id">Profile</Link> */}
			<Link to="/logout">Logout</Link>
			<Outlet />
		</>
	);
}
