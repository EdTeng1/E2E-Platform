import { Col, Input, Row, Select } from "antd";
import React from "react";

// Select组件需要的选项
const { Option } = Select;
const { Search } = Input;

// 示例数据，您需要根据实际情况来替换
const specializationOptions = ["Clinical", "Care", "Administrative", "Auxiliary"];
const regionOptions = ["Asia", "Europe", "America", "Australia"];
const ratingsOptions = ["A", "B", "C", "D"];

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
	return (
		<div>
			{/* 搜索框和过滤器部分 */}
			<div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
				<div style={{ textAlign: "center", marginBottom: "20px" }}>
					<img
						src='https://mms.businesswire.com/media/20221121005063/en/1642918/22/Genmab_Logo_Color_RGB.jpg'
						alt='GENMAB'
						style={{ maxWidth: "100%", height: "auto", maxHeight: "120px" }}
					/>
				</div>

				<Search
					style={{ marginBottom: "20px" }}
					placeholder='请输入搜索内容'
					enterButton='Search'
					size='large'
					onSearch={(value) => console.log(value)}
				/>

				{/* Filter部分 */}
				<FilterBar />
			</div>
		</div>
	);
};

export default App;
