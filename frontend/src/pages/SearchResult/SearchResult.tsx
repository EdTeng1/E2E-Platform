import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Card, Layout, Menu, Pagination, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {start} from "repl";

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;
const {Option}  = Select;


const SearchData: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Safe fallback for missing location.state
    const Result = location.state ? location.state : { searchResult: [] };

    // State hooks for component state management
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
	let mt = 0;
    const handleCardClick = (userId: number) => {
        navigate(`/App_KOLprofile?profileID=${encodeURIComponent(userId)}`);
    };
    
    useEffect(() => {
        // Initially load all data
        setUsers(Result.searchResult);
        // setTotalPages(Math.ceil(Result.searchResult.length / perPage));
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
                users: Result.searchResult
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
		<Layout>
			<Header>
				{/* 菜单部分 */}
				{/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ display: 'flex', justifyContent: 'flex-end' }}/> */}
			</Header>
			<Content style={{ padding: "0 48px" }}>
				<Layout style={{ padding: "24px 0" }}>
					<Sider width={200} style={{backgroundColor:'white'}}>
                        {/* Filters Sidebar */}
                        <div style={{ margin: '20px 0' }}>
                            <h3>Filters</h3>
                            <div>
                                <div style={{ marginBottom: 16 }}>
                                    <label>Location: </label>
                                    <Select value={filterLocation} style={{ width: 180 }} onChange={setFilterLocation}>
                                        <Option value="">Any</Option>
                                        <Option value="Eastern">Eastern</Option>
                                        <Option value="Central">Central</Option>
                                        <Option value="Mountain">Mountain</Option>
                                        <Option value="Pacific">Pacific</Option>
                                    </Select>
                                </div>
                                <div style={{ marginBottom: 16 }}>
                                    <label>Score: </label>
                                    <Select value={filterScore} style={{ width: 180 }} onChange={setFilterScore}>
                                        <Option value="">Any</Option>
                                        <Option value="A">A ('&gt' 60)</Option>
                                        <Option value="B">B (40 - 60)</Option>
                                        <Option value="C">C ('&lt' 40)</Option>
                                    </Select>
                                </div>
                                <Button type="primary" onClick={handleFilterApply} disabled={loading}>
                                    Apply Filters
                                </Button>
                                {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
                            </div>
                        </div>
					</Sider>
					<Content style={{ padding: "0 24px", minHeight: 280 }}>
						{/* 卡片内容 */}
						<div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
						{visibleUsers.map((user:any, index:any) => (
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
                                    <p>{`Score: ${user.score}`}</p>
                                </Card>
                            ))}
                            <Pagination
                                defaultCurrent = {currentPage}
                                total = {users.length}
                                pageSize = {itemsPerPage}
                                onChange = {handlePageChange}
                            />
						</div>


					</Content>
				</Layout>
			</Content>
			<Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Our Amazing Team</Footer>
		</Layout>
	);
};

export default SearchData;