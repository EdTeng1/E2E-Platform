import { Button, Card, Layout, Menu, Pagination, Select, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
const { Option } = Select;
const { Title } = Typography;

const SearchData: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Safe fallback for missing location.state
	const Result = location.state ? location.state : { searchResult: [] };

	// State hooks for component state management
	const [OriginResult, setOriginResult] = useState(Result.searchResult);
	const [users, setUsers] = useState(Result.searchResult);
	const [filterLocation, setFilterLocation] = useState('');
	const [filterScore, setFilterScore] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const totalPages = Math.ceil(users.length / itemsPerPage);

	useEffect(() => {
		if (Result.searchResult.length > 0) {
			setUsers(Result.searchResult);
		} else {
			setError('No search results available. Please try a new search.');
		}
	}, [Result]);
	console.log('Result:', Result);
	console.log('users:', users);

	const handleCardClick = (userId: number) => {
		navigate(`/App_KOLprofile?profileID=${encodeURIComponent(userId)}`);
	};
    
	useEffect(() => {
		// Initially load all data
		setUsers(Result.searchResult);
	}, [Result]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const visibleUsers = users.slice(startIndex, startIndex + itemsPerPage);

	const handleFilterApply = async () => {
		setLoading(true);
		console.log('filterLocation:', filterLocation);
		console.log('filterScore:', filterScore);
		console.log('Sending users:', Result.searchResult);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				location: filterLocation,
				score: filterScore,
				users: OriginResult
			})
		};
		try {
			const response = await fetch('/api/users', requestOptions);
			const data = await response.json();
			console.log('Filtered data:', data);
			Result.searchResult = data;
	
			// Assuming the backend sends back filtered results directly:
			setUsers(data);
			setError('');
		} catch (error) {
			console.error('Failed to fetch filtered data:', error);
			setError('Failed to fetch data. Please try again.');
		}
		setLoading(false);
	};

	return (
		<Layout className="layout">
			<Header>
				<Typography.Title level={1} style={{ color: "teal", lineHeight: "32px", marginLeft: "20px" }}>
					Search Results
				</Typography.Title>
			</Header>
			<Content style={{ padding: "0 50px" }}>
				<Layout style={{ padding: "24px 0" }}>
                <Sider width={250} style={{ background: '#ffffff', padding: '20px', borderRight: '1px solid #e8e8e8', borderRadius: '10px' }}>
						{/* Filters Sidebar */}
						<div style={{ margin: '20px 0' }}>
							<Typography.Title level={3}>Filters</Typography.Title>
							<div>
								<div style={{ marginBottom: '16px' }}>
									<Typography.Text strong>Location: </Typography.Text>
									<Select value={filterLocation} style={{ width: '100%' }} onChange={setFilterLocation}>
										<Option value="">Any</Option>
										<Option value="Eastern">Eastern</Option>
										<Option value="Central">Central</Option>
										<Option value="Mountain">Mountain</Option>
										<Option value="Pacific">Pacific</Option>
									</Select>
								</div>
								<div style={{ marginBottom: '16px' }}>
									<Typography.Text strong>Score: </Typography.Text>
									<Select value={filterScore} style={{ width: '100%' }} onChange={setFilterScore}>
										<Option value="">Any</Option>
										<Option value="A">A (more than 600)</Option>
										<Option value="B">B (400 - 600)</Option>
										<Option value="C">C (less than 400)</Option>
									</Select>
								</div>
								<Button type="primary" onClick={handleFilterApply} disabled={loading} style={{ width: '100%' }}>
									Apply Filters
								</Button>
								{error && <Typography.Text type="danger" style={{ display: 'block', marginTop: '10px' }}>{error}</Typography.Text>}
							</div>
						</div>
					</Sider>
					<Content style={{ padding: "0 24px", minHeight: 280 }}>
						<div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
							{visibleUsers.map((user: any, index: any) => (
								<Card
									key={index}
									hoverable
									style={{
										width: 240,
										margin: '0 10px 20px 10px'
									}}
									onClick={() => handleCardClick(user.id)}
								>
									<Meta title={`${user.name}`} />
									<p>{`Location: ${user.location}`}</p>
									<p>{`Institution: ${user.institution}`}</p>
									<p>{`Score: ${user.score}`}</p>
								</Card>
							))}
						</div>
						<Pagination
							style={{
								marginTop: "20px",
								textAlign: "center"
							}}
							current={currentPage}
							total={users.length}
							pageSize={itemsPerPage}
							onChange={handlePageChange}
						/>
					</Content>
				</Layout>
			</Content>
			<Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Our Amazing Team</Footer>
		</Layout>
	);
};

export default SearchData;
