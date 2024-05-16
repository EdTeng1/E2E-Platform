import { Button, Input, Select, message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../service/http";
import "./index.css";

// Select组件需要的选项
const { Option } = Select;

const Home: React.FC = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();
	const [query, setQuery] = React.useState("");
	const [searchType, setSearchType] = React.useState("name");

	const clickSearch = async () => {
		if (!query.trim()) {
			messageApi.info("Please enter a search term!");
			return;
		}
		try {
			const response = await postData("/search", { query, searchType });
			console.log("query:", query);
			console.log("response:", response);

			if (response.status == 422) {
				navigate("/login");
			}

			if (!response.ok) {
				throw new Error("Failed to fetch search results. Status: " + response.status);
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
			console.error("Error fetching search results:", error);
			messageApi.error("Failed to fetch search results.");
		}
	};

	// Add event listener for Enter key
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				clickSearch();
			}
		};

		window.addEventListener('keypress', handleKeyPress);

		return () => {
			window.removeEventListener('keypress', handleKeyPress);
		};
	}, [query, searchType]);

	return (
		<div className='container'>
			{contextHolder}
			<img
				src='https://mms.businesswire.com/media/20221121005063/en/1642918/22/Genmab_Logo_Color_RGB.jpg'
				alt='GENMAB'
				className='logo'
			/>
			<div className='search-container'>
				<Select defaultValue="name" style={{ width: 120 }} onChange={(value) => setSearchType(value)}>
					<Option value="name">Name</Option>
					<Option value="institution">Institution</Option>
				</Select>
				<Input
					className='search-input'
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder='Search for users by name or institution...'
				/>
				<Button onClick={clickSearch} type='primary' className='search-button'>
					Search
				</Button>
			</div>
		</div>
	);
};

export default Home;
