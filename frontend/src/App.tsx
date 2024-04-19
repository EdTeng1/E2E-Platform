import { AppstoreOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, Link, useLocation } from "react-router-dom";
import App_KOLprofile from "./pages/KOLprofile/App_KOLprofile";
import SearchResult from "./pages/SearchResult/SearchResult";
import Home from "./pages/Home/Home";
import Questionaire from "./pages/Questionaire/questionaire";
import Signup from "./pages/Register/Signup";
import Login from "./pages/Register/Login";
import logo from "./assets/Genmab_Logo_Color_RGB.jpg";
import "./App.css";

interface MenuItem {
	label: JSX.Element;
	key: string;
	icon?: JSX.Element;
	children?: MenuItem[];
}

const items: MenuItem[] = [
	{
		label: <Link to='/Home'>Home</Link>,
		key: "Home",
		icon: <AppstoreOutlined />,
	},
	{
		label: <Link to='/SearchResult'>Search Result</Link>,
		key: "SearchResult",
		icon: <AppstoreOutlined />,
	},
	{
		label: <Link to='/questionaire'>Questionaire</Link>,
		key: "questionaire",
		icon: <AppstoreOutlined />,
	},
	{
		label: <Link to='/App_KOLprofile'>KOL Profile</Link>,
		key: "App_KOLprofile",
		icon: <AppstoreOutlined />,
	},
	{
		label: <span>Contact</span>,
		key: "mail",
		icon: <MailOutlined />,
	},
	{
		label: <span>Profile</span>,
		key: "SubMenu",
		icon: <UserOutlined />,
		children: [
			{
				label: <span>Account</span>,
				key: "group-account",
				children: [
					{
						label: <Link to='/signup'>Signup</Link>,
						key: "signup",
					},
					{
						label: <Link to='/login'>Login</Link>,
						key: "login",
					},
				],
			},
		],
	},
];

const App: React.FC = () => {
	const location = useLocation();
	const [current, setCurrent] = useState<string>("home");

	useEffect(() => {
		const path = location.pathname.substring(1) || "home"; // handle root path
		const matchingItem = items.find((item) => item.key === path);
		const key: string = matchingItem ? (matchingItem.key as string) : "home"; // Ensure the key is always valid and a string, cast as string for safety
		setCurrent(key);
	}, [location]);

	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e);
		setCurrent(e.key);
	};

	return (
		<div>
			{/* Menu part */}
			<div className='menu-bar-container'>
				{/* Logo part */}
				<a href='https://www.genmab.com' target='_blank' rel='noopener noreferrer'>
					<img src={logo} alt='Logo' style={{ width: "120px", height: "auto" }} />
				</a>
				{/* Menu part */}
				<Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} />
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
	);
};

export default App;
