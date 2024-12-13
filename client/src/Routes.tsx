import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import { useContext } from "react";
import Home from "./components/Home";
// import { RouterProvider } from "react-router/dom";

export default function Router({ isLoggedIn, setIsLoggedIn }) {
	//if !user, render login, if user render home?
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<NavBar />}>
					{/* <Route index element={<Home />}></Route> */}
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
