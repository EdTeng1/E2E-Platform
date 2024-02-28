import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Row, Col, Input,Select } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

// Select组件需要的选项
const { Option } = Select;
const { Search } = Input;

// 示例数据，您需要根据实际情况来替换
const specializationOptions = ['Clinical', 'Care', 'Administrative','Auxiliary'];
const regionOptions = ['Asia', 'Europe', 'America','Australia'];
const ratingsOptions = ['A', 'B', 'C','D'];


const items: MenuProps['items'] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: 'Navigation Two',
    key: 'app',
    icon: <AppstoreOutlined />,
    disabled: true,
  },
  {
    label: 'Navigation Three - Submenu',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'About Us',
        children: [
          {
            label: 'Our Mission and Vision',
            key: 'setting:1',
          },
          {
            label: 'Our Team',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Health Information',
        children: [
          {
            label: 'Disease and Conditions',
            key: 'setting:3',
          },
          {
            label: 'Health Tips and Wellness',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Navigation Four - Link
      </a>
    ),
    key: 'alipay',
  },
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
    <div>
      {/* 菜单部分 */}
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

      {/* 搜索框和过滤器部分 */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src="https://mms.businesswire.com/media/20221121005063/en/1642918/22/Genmab_Logo_Color_RGB.jpg" alt="GENMAB" 
          style={{ maxWidth: '100%', height: 'auto', maxHeight: '120px' }}/>
        </div>

        <Search
          style={{ marginBottom: '20px' }}
          placeholder="请输入搜索内容"
          enterButton="Search"
          size="large"
          onSearch={value => console.log(value)}
        />

        {/* Filter部分 */}
        <FilterBar />
      </div>
    </div>
  );

};

export default App;