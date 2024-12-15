import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/HomePage/Home";
import Profile from "./components/Profile";

export default function Router({ isLoggedIn, setIsLoggedIn }) {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
					{isLoggedIn ? (
						<>
							<Route path="/" element={<Home />} />
							<Route path="/profile/:id" element={<Profile />} />
						</>
					) : (
						<Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
					)}
					<Route path="/signup" element={<Signup />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
