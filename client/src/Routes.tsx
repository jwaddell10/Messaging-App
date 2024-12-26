import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/HomePage/Home";
import Profile from "./components/Profile";
import Message from "./components/Message";
import { useAuth } from "./helpers/authContext";

export default function Router() {
	const { user } = useAuth();
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<NavBar />}>
					{user ? (
						<>
							<Route path="/" element={<Home />}>
								<Route
									path="/message/:id"
									element={<Message />}
								/>
							</Route>
							<Route path="/profile/:id" element={<Profile />} />
						</>
					) : (
						<Route path="/" element={<Login />} />
					)}
					<Route path="/signup" element={<Signup />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
