import { AppstoreOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App_KOLprofile from "./App_KOLprofile";
import SearchResult from "./pages/SearchResult/SearchResult";
import Home from "./pages/Home/Home";
import Questionaire from "./questionaire";

const items: MenuProps["items"] = [
	{
		label: (
			<a href='./Home' target='_blank' rel='noopener noreferrer'>
				Home
			</a>
		), // Use Link in label for navigation
		key: "home",
		icon: <AppstoreOutlined />,
	},
	{
		label: (
			<a href='./SearchResult' target='_blank' rel='noopener noreferrer'>
				Search Result
			</a>
		), // Use Link in label for navigation
		key: "searchResult",
		icon: <AppstoreOutlined />,
	},
	{
		label: (
			<a href='./questionaire' target='_blank' rel='noopener noreferrer'>
				Questionaire
			</a>
		), // Use Link in label for navigation
		key: "questionaire",
		icon: <AppstoreOutlined />,
	},
	{
		label: (
			<a href='./App_KOLprofile' target='_blank' rel='noopener noreferrer'>
				KOL Profile
			</a>
		), // Use Link in label for navigation
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
				label: "Item 1",
				children: [
					{
						label: "Option 1",
						key: "setting:1",
					},
					{
						label: "Option 2",
						key: "setting:2",
					},
				],
			},
		],
	},
];

const App: React.FC = () => {
	const [current, setCurrent] = useState("mail");

	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e);
		setCurrent(e.key);
	};

	return (
		<Router>
			<div>
				{/* Menu part */}
				<Menu
					onClick={onClick}
					selectedKeys={[current]}
					mode='horizontal'
					items={items}
					style={{ display: "flex", justifyContent: "flex-end" }}
				/>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/Home' element={<Home />} />
					<Route path='/SearchResult' element={<SearchResult />} />
					<Route path='/questionaire' element={<Questionaire />} />
					<Route path='/App_KOLprofile' element={<App_KOLprofile />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
