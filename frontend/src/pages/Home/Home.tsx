import { Button, Col, Input, Row, Select, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { postData } from '../../service/http';
import axios from "axios";
import { queryKOLProfileByName } from "../../service/KOLProfile";
import "./index.css";

// Select组件需要的选项
const { Option } = Select;
const { Search } = Input;


const Home: React.FC = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [query, setQuery] = React.useState('');

	const clickSearch = async () => {
		if (!query.trim()) {
			messageApi.info("Please enter a search term!");
			return;
		}
		try {
			const response = await postData('/search', { query });
			console.log('query:', query);
			console.log('response:', response);
	
			if (!response.ok) {
				throw new Error('Failed to fetch search results. Status: ' + response.status);
			}
	
			const data = await response.json();
			if (data.length === 0) {
				messageApi.info("No Data!", 1).then(() => {
					navigate("/questionaire");
				});
			} else {
				navigate("/SearchResult", {
					state: {
						searchValue: query,
						searchResult: data,
					},
				});
			}
		} catch (error) {
			
			console.error('Error fetching search results:', error);
			messageApi.error("Failed to fetch search results.");
		}
	};
	
	return (
		<div className="container">
			{contextHolder}
			<img
				src="https://mms.businesswire.com/media/20221121005063/en/1642918/22/Genmab_Logo_Color_RGB.jpg"
				alt="GENMAB"
				className="logo"
			/>
			<div className="search-container">
				<Input
					className="search-input"
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for users..."
				/>
				<Button onClick={clickSearch} type="primary" className="search-button">Search</Button>
			</div>
		</div>
	);
};

export default Home;