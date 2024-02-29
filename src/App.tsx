import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Row, Col, Input,Select } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import SearchResult from './SearchResult';
import Questionaire from './questionaire';

// Select组件需要的选项
const { Option } = Select;
const { Search } = Input;

// 示例数据，您需要根据实际情况来替换
const specializationOptions = ['Option 1', 'Option 2', 'Option 3'];
const regionOptions = ['Option 1', 'Option 2', 'Option 3'];
const ratingsOptions = ['Option 1', 'Option 2', 'Option 3'];


const items: MenuProps['items'] = [
  {
    label: (
      <a href="./Home" target="_blank" rel="noopener noreferrer">
        Home
      </a>
    ), // Use Link in label for navigation
    key: 'home',
    icon: <AppstoreOutlined />,
  },
  {
    label: (
      <a href="./SearchResult" target="_blank" rel="noopener noreferrer">
        Search Result
      </a>
    ), // Use Link in label for navigation
    key: 'searchResult',
    icon: <AppstoreOutlined />,
  },
  {
    label: (
      <a href="./questionaire" target="_blank" rel="noopener noreferrer">
        Questionaire
      </a>
    ), // Use Link in label for navigation
    key: 'questionaire',
    icon: <AppstoreOutlined />,
  },
  // {
  //   label: 'Navigation Three - Submenu',
  //   key: 'SubMenu',
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       type: 'group',
  //       label: 'Item 1',
  //       children: [
  //         {
  //           label: 'Option 1',
  //           key: 'setting:1',
  //         },
  //         {
  //           label: 'Option 2',
  //           key: 'setting:2',
  //         },
  //       ],
  //     },
  //     {
  //       type: 'group',
  //       label: 'Item 2',
  //       children: [
  //         {
  //           label: 'Option 3',
  //           key: 'setting:3',
  //         },
  //         {
  //           label: 'Option 4',
  //           key: 'setting:4',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: (
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Navigation Four - Link
  //     </a>
  //   ),
  //   key: 'alipay',
  // },
];

// Filtet组件
const FilterBar = () => (
  <Row gutter={16}>
    <Col span={8}>
      <Select defaultValue={specializationOptions[0]} style={{ width: '100%' }}>
        {specializationOptions.map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>
    </Col>
    <Col span={8}>
      <Select defaultValue={regionOptions[0]} style={{ width: '100%' }}>
        {regionOptions.map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>
    </Col>
    <Col span={8}>
      <Select defaultValue={ratingsOptions[0]} style={{ width: '100%' }}>
        {ratingsOptions.map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>
    </Col>
  </Row>
);

const App: React.FC = () => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
    {/* <div> */}
      {/* 菜单部分 */}
      {/* <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} /> */}

      {/* 搜索框和过滤器部分 */}
      {/* <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="https://mms.businesswire.com/media/20221121005063/en/1642918/22/Genmab_Logo_Color_RGB.jpg" alt="GENMAB"
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '120px' }} />
        </div>

        <Search
          style={{ marginBottom: '20px' }}
          placeholder="请输入搜索内容"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)} /> */}

        {/* Filter部分 */}
        {/* <FilterBar />
      </div>
    </div> */}
    <Router>
      <div>
        {/* Menu part */}
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/SearchResult" element={<SearchResult />} />
          <Route path="/questionaire" element={<Questionaire />} />
          {/* Define other routes and components as needed */}
        </Routes>
      </div>
    </Router>
    </>
  );

};

export default App;