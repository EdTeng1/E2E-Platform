import { AppstoreOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, message } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import { Route, BrowserRouter as Router, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import App_KOLprofile from "./pages/KOLprofile/App_KOLprofile";
import SearchResult from "./pages/SearchResult/SearchResult";
import AboutUs from "./pages/AboutUs/AboutUs";
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
		label: <Link to='/about-us'>About Us</Link>,
		key: "about-us",
		icon: <UserOutlined />,
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
						label: <Link to='/login'>Login</Link>,
						key: "login",
					},
					{
						label: <Link to='/signup'>Signup</Link>,
						key: "signup",
					},
				],
			},
			{
				label: (
					<div
						onClick={() => {
							localStorage.removeItem("token");
							localStorage.removeItem("userEmail");
						}}>
						<Link to='/login'>Logout</Link>
					</div>
				),
				key: "log-out",
			},
		],
	},
];

const App: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const [current, setCurrent] = useState<string>("home");

	const [userEmail, setUserEmail] = useState<string | null>(null);

	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

	useEffect(() => {
		const path = location.pathname.substring(1) || "home"; // handle root path
		const matchingItem = items.find((item) => item.key === path);
		const key: string = matchingItem ? (matchingItem.key as string) : "home"; // Ensure the key is always valid and a string, cast as string for safety
		setCurrent(key);
	}, [location]);

	useEffect(() => {
		setUserEmail(localStorage.getItem("userEmail")); // Fetch the user's email from local storage
	}, []);

	useEffect(() => {
		console.log(location.pathname);
		if (location.pathname.includes("login") || location.pathname.includes("signup")) return;
		if (!localStorage.getItem("token")) {
			messageApi.error("not login!!");

			// Redirect to login page if not logged in
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		}
	}, [location.pathname]);

	useEffect(() => {
		// Update menu items based on login state
		const updatedItems = [...items]; // start with the static items
		if (localStorage.getItem("token")) {
			updatedItems.push({
				label: <>Logged in as: {userEmail}</>,
				key: "userEmail",
				icon: <MailOutlined />,
			});
		}
		setMenuItems(updatedItems);
	}, [userEmail]);

	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e);
		setCurrent(e.key);
	};

	const hasLogin = useMemo(() => {
		return !!localStorage.getItem("token");
	}, [location.pathname]);

	useEffect(() => {
		console.log(location.pathname);
		if (location.pathname.includes("login") || location.pathname.includes("signup")) return;
		if (!hasLogin) {
			messageApi.error("not login!!");

			// 还没登录，直接跳转登录页面
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		}
	}, [location.pathname]);

	return (
		<div>
			{contextHolder}
			{/* Menu part */}
			<div className='menu-bar-container'>
				{/* Logo part */}
				<a href='https://www.genmab.com' target='_blank' rel='noopener noreferrer'>
					<img src={logo} alt='Logo' style={{ width: "120px", height: "auto" }} />
				</a>
				{/* Menu part */}
				{localStorage.getItem("token") && (
					<Menu
						inlineCollapsed={false}
						onClick={onClick}
						selectedKeys={[current]}
						mode='horizontal'
						items={menuItems}
					/>
				)}
			</div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/Home' element={<Home />} />
				<Route path='/SearchResult' element={<SearchResult />} />
				<Route path='/questionaire' element={<Questionaire />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/login' element={<Login />} />
				<Route path='/App_KOLprofile' element={<App_KOLprofile />} />
				<Route path='/about-us' element={<AboutUs />} />
			</Routes>
		</div>
	);
};

export default App;
