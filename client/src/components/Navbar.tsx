import { Outlet, Link } from "react-router";
import { AuthContext } from "../helpers/authContext";
import { useContext } from "react";
import { useStorageContext } from "../helpers/storageContext";
import "../Styles/Navbar.css";

export default function NavBar() {
	const { user, logout } = useContext(AuthContext);
	const { id } = useStorageContext();

	return (
		<>
			<nav className="navbar">
				<ul className="navbar-links-section">
					<li className="navbar-links">
						<Link className="link-styles" to="/">
							Home
						</Link>
					</li>
					{user ? (
						<>
							<li className="navbar-links">
								<Link
									className="link-styles"
									to={`/profile/${id}`}
								>
									Profile
								</Link>
							</li>
							<li className="navbar-links">
								<Link
									className="link-styles"
									to="/"
									onClick={logout}
								>
									Logout
								</Link>
							</li>
						</>
					) : (
						<li className="navbar-links">
							<Link className="link-styles" to="/">
								Login
							</Link>
						</li>
					)}
				</ul>
			</nav>
			<Outlet />
		</>
	);
}
