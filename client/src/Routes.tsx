import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/HomePage/Home";

export default function Router({ isLoggedIn }) {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<NavBar />}>
					{isLoggedIn ? (
						<Route path="/" element={<Home />} />
					) : (
						<Route path="/" element={<Login />} />
					)}
					<Route path="/signup" element={<Signup />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
