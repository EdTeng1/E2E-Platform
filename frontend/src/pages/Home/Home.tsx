import { Button, Col, Input, Row, Select, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { queryKOLProfileByName } from "../../service/KOLProfile";
import "./index.css";

// Select组件需要的选项
const { Option } = Select;
const { Search } = Input;

interface query {
	value: string;
}

const Home: React.FC = () => {
	const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [query, setQuery] = React.useState('');
	// const clickSearch = async (value: string) => {
	// 	if (!value.trim()) return;

	// 	const res = await queryKOLProfileByName(value);

	// 	if (!res || res.length === 0) {
	// 		// direct after 1s
	// 		messageApi.info("No Data!", 1).then(() => {
	// 			navigate("/questionaire");
	// 		});
	// 		return;
	// 	}

	// 	navigate("/SearchResult", {
	// 		// transform the value to new page
	// 		// we can get the state from new page by `useLocation`
	// 		state: {
	// 			searchValue: value,
	// 			searchResult: res,
	// 		},
	// 	});
	// };
	const clickSearch = async () => {
        if (!query.trim()) {
            messageApi.info("Please enter a search term!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/search", { query }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('query:', query);
            console.log('response:', response);
            if (response.data.length === 0) {
                messageApi.info("No Data!", 1).then(() => {
                    navigate("/questionaire");
                });
            } else {
                navigate("/SearchResult", {
                    state: {
                        searchValue: query,
                        searchResult: response.data,
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