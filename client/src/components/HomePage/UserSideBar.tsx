import useFetchUsers from "../../helpers/useFetchUsers";
import { Link } from "react-router";

// interface User {
//     id: number;
// 	name: string;
// }

export default function UserSideBar() {
	const { users, error } = useFetchUsers();

	return (
		<section>
			{error}
			{users &&
				users.map((user) => (
					<li key={user.id}>
						<Link to={`/profile/${user.id}`}>{user.name}</Link>
					</li>
				))}
		</section>
	);
}