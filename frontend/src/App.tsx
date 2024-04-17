import { AppstoreOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import App_KOLprofile from "./App_KOLprofile";
import SearchResult from "./pages/SearchResult/SearchResult";
import Home from "./pages/Home/Home";
import Questionaire from "./pages/Questionaire/questionaire";
import Signup from "./pages/Register/Signup";
import Login from "./pages/Register/Login";
import logo from './assets/Genmab_Logo_Color_RGB.jpg';
import './App.css';

const items: MenuProps["items"] = [
	{
		label: <Link to="/Home">Home</Link>,
		key: "home",
		icon: <AppstoreOutlined />,
	},
	{
		label: <Link to="/SearchResult">Search Result</Link>,
		key: "searchResult",
		icon: <AppstoreOutlined />,
	},
	{
		label: <Link to="/questionaire">Questionaire</Link>,
		key: "questionaire",
		icon: <AppstoreOutlined />,
	},
	{
		label: <Link to="/App_KOLprofile">KOL Profile</Link>,
		key: "kolProfile",
		icon: <AppstoreOutlined />,
	},
	{
		label: "Contact",
		key: "mail",
		icon: <MailOutlined />,
	},
	{
		label: "Profile",
		key: "SubMenu",
		icon: <UserOutlined />,
		children: [
			{
				type: "group",
				label: "Account",
				children: [
					{
						label: <Link to="/signup">Signup</Link>,
						key: "signup",
					},
					{
						label: <Link to="/login">Login</Link>,
						key: "login",
					},
				],
			},
		],
	},
];

const App: React.FC = () => {
	const [current, setCurrent] = useState("home");

	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e);
		setCurrent(e.key);
	};

	return (
		<Router>
			<div>
				{/* Menu part */}
				<div className="menu-bar-container">
					{/* Logo part */}
					<a href="https://www.genmab.com" target="_blank" rel="noopener noreferrer">
						<img src={logo} alt="Logo" style={{ width: '120px', height: 'auto' }} />
					</a>
					{/* Menu part */}
					<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
				</div>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Home' element={<Home />} />
					<Route path='/SearchResult' element={<SearchResult />} />
					<Route path='/questionaire' element={<Questionaire />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/App_KOLprofile' element={<App_KOLprofile />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
