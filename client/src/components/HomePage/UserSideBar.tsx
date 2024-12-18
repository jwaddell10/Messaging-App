import useFetchUsers from "../../helpers/useFetchUsers";
import "../../Styles/UserSideBar.css";

export default function UserSideBar() {
	const loggedInUser = localStorage.getItem("username");
	const { users, error } = useFetchUsers();

	//display all users (except user who is currently logged in) in UserSideBar
	const filteredUsers = users.filter((user) => user.name !== loggedInUser);

	if (error) {
		return (
			<p style={{ color: "white" }}>
				Failed to load users. Please try again later
			</p>
		);
	}

	return (
		<section className="sidebar">
			<h1 className="sidebar-title">Users</h1>
			{filteredUsers &&
				filteredUsers.map((user) => (
					<ul className="sidebar-user-list" key={user.id}>
						<li>{user.name}</li>
					</ul>
				))}
		</section>
	);
}
