import useFetchUsers from "../../helpers/useFetchUsers";
import { Link } from "react-router";

export default function UserSideBar() {
	const loggedInUser = localStorage.getItem("username");
	const { users, error } = useFetchUsers();

	//display all users (except user who is currently logged in) in UserSideBar
	const filteredUsers = users.filter((user) => user.name !== loggedInUser);

	return (
		<section>
			{error}
			{filteredUsers &&
				filteredUsers.map((user) => (
					<li key={user.id}>
						<Link to={`/message/${user.id}/${user.name}`}>{user.name}</Link>
					</li>
				))}
		</section>
	);
}
