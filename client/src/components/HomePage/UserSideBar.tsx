import { useStorageContext } from "../../helpers/storageContext";
import useFetchMessages from "../../helpers/useFetchMessages";
import useFetchUsers from "../../helpers/useFetchUsers";
import "../../Styles/UserSideBar.css";

export default function UserSideBar() {
	const loggedInUser = localStorage.getItem("username");
	const { users, error } = useFetchUsers();
	const { id, token } = useStorageContext();
	// const { refetchMessages } = useFetchMessages(id, token);
	// console.log(refetchMessages, "fetch messages in use");
	//display all users (except user who is currently logged in) in UserSideBar

	//when clicked, display messages between those users
	const filteredUsers = users.filter((user) => user.name !== loggedInUser);

	const handleClick = () => {
		console.log('click runs')
		// refetchMessages(id, token)
	}

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
						<li onClick={handleClick}>{user.name}</li>
					</ul>
				))}
		</section>
	);
}
