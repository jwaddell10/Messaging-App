import useFetchUsers from "../../helpers/useFetchUsers";

export default function UserSideBar() {
	const { users, error } = useFetchUsers();

	return (
		<section>
			{error}
			{users && users.map((user, id) => <li key={id}>{user.name}</li>)}
		</section>
	);
}
