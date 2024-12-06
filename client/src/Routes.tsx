import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import Home from "./Home";
// import { RouterProvider } from "react-router/dom";

export default function Router() {

    //if !user, render login, if user render home?
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<NavBar />}>
					{/* <Route index element={<Home />}></Route> */}
					<Route path="/" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
