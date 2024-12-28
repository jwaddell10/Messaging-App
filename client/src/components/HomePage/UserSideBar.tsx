import { useStorageContext } from "../../helpers/storageContext";
import useFetchMessages from "../../helpers/useFetchMessages";
import useFetchUsers from "../../helpers/useFetchUsers";
import { useNavigate, useParams } from "react-router";
import "../../Styles/UserSideBar.css";

export default function UserSideBar() {
	const { id } = useParams()
	const navigate = useNavigate();
	const loggedInUser = localStorage.getItem("username");
	const { users, error } = useFetchUsers();
	const { loggedInUserId, token } = useStorageContext();
	const { refetchMessages } = useFetchMessages(loggedInUserId ?? "", id ?? "", token ?? "");
	// console.log(refetchMessages, "fetch messages in use");
	//display all users (except user who is currently logged in) in UserSideBar

	//when clicked, display messages between those users
	const filteredUsers = users.filter((user) => user.name !== loggedInUser);

	const handleClick = (id: number) => {
		console.log(id, 'id in handleclicks')
		refetchMessages(loggedInUserId ?? "", id, token ?? "");
		navigate(`message/${id}`)
	};

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
						<li
							onClick={() => {
								handleClick(user.id)
							}}
						>
							{user.name}
						</li>
					</ul>
				))}
		</section>
	);
}
