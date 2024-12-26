import UserSideBar from "./UserSideBar";
import { Outlet } from "react-router";
import Message from "../Message";

export default function Home() {
	return (
		<>
			<UserSideBar />
			<Message />
			<Outlet />
		</>
	);
}
