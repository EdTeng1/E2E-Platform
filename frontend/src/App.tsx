import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Row, Col, Input, Select } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchResult from "./SearchResult";
import Questionaire from "./questionaire";
import App_KOLprofile from "./App_KOLprofile";

// Select组件需要的选项
const { Option } = Select;
const { Search } = Input;

// 示例数据，您需要根据实际情况来替换
const specializationOptions = ["Option 1", "Option 2", "Option 3"];
const regionOptions = ["Option 1", "Option 2", "Option 3"];
const ratingsOptions = ["Option 1", "Option 2", "Option 3"];

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

// Filtet组件
const FilterBar = () => (
	<Row gutter={16}>
		<Col span={8}>
			<Select defaultValue={specializationOptions[0]} style={{ width: "100%" }}>
				{specializationOptions.map((option) => (
					<Option key={option} value={option}>
						{option}
					</Option>
				))}
			</Select>
		</Col>
		<Col span={8}>
			<Select defaultValue={regionOptions[0]} style={{ width: "100%" }}>
				{regionOptions.map((option) => (
					<Option key={option} value={option}>
						{option}
					</Option>
				))}
			</Select>
		</Col>
		<Col span={8}>
			<Select defaultValue={ratingsOptions[0]} style={{ width: "100%" }}>
				{ratingsOptions.map((option) => (
					<Option key={option} value={option}>
						{option}
					</Option>
				))}
			</Select>
		</Col>
	</Row>
);

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
