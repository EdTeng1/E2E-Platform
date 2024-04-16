import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Card, Layout, Menu, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

const ts = ["Specialization", "Region", "Ratings"];
const ts_c = [
	["Clinical", "Care", "Administrative", "Auxiliary"],
	["Asia", "Europe", "America", "Australia"],
	["A", "B", "C", "D"],
];
const Filter: MenuProps["items"] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
	const key = ts[index];

	return {
		key: `sub${key}`,
		icon: React.createElement(icon),
		label: `${key}`,

		children: new Array(4).fill(null).map((_, j) => {
			const subKey = ts_c[index][j];
			return {
				key: subKey,
				label: `${subKey}`,
			};
		}),
	};
});

const SearchData: React.FC = () => {
	const location = useLocation();

	const Result = location.state;
	console.log("searchResult: ", Result);
	console.log("searchResult: ", Result.searchResult[0]);

	let mt = 0;
	// card_list.push(
	// 	<Card
	// 		hoverable
	// 		style={{ width: 240, marginBottom: 16, marginInline: mt }}
	// 		cover={
	// 			<img
	// 				alt='example'
	// 				height={350}
	// 				src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.doubanio.com%2Fview%2Fphoto%2Fm%2Fpublic%2Fp2292568076.jpg&refer=http%3A%2F%2Fimg9.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1711504884&t=e0a39d1a707e371ae7290ccc4fd9f9f2'
	// 			/>
	// 		}
	// 		key={0}>
	// 		<Meta title='Roderic Guigo' description='Cancer Center' />
	// 		<p>Score: 80</p>
	// 	</Card>
	// );


	return (
		<Layout>
			<Header>
				{/* 菜单部分 */}
				{/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ display: 'flex', justifyContent: 'flex-end' }}/> */}
			</Header>
			<Content style={{ padding: "0 48px" }}>
				<Layout style={{ padding: "24px 0" }}>
					<Sider width={200}>
						<Menu
							mode='inline'
							defaultSelectedKeys={["1"]}
							defaultOpenKeys={["sub1"]}
							style={{ height: "100%" }}
							items={Filter}
						/>
					</Sider>
					<Content style={{ padding: "0 24px", minHeight: 280 }}>
						{/* 卡片内容 */}
						<div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
						{Result.searchResult.map((user:any, index:any) => (
                                <Card
                                    key={index}
                                    hoverable
                                    style={{
                                        width: 240,
                                        margin: '0 10px 20px 10px'
                                    }}
                                >
                                    <Meta title={`${user.name}`} description={`Title: ${user.title}`} />
                                    <p>{`Location: ${user.location}`}</p>
                                    <p>{`Occupation: ${user.occupation}`}</p>
                                </Card>
                            ))}
						</div>

						{/* 分页 */}
						<Pagination defaultCurrent={1} total={50} style={{ textAlign: "center", margin: "20px 0" }} />
					</Content>
				</Layout>
			</Content>
			<Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
		</Layout>
	);
};

export default SearchData;