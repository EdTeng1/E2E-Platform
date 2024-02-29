import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Row, Col, Input,Select } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';

// Select组件需要的选项
const { Option } = Select;
const { Search } = Input;

// 示例数据，您需要根据实际情况来替换
const specializationOptions = ['Option 1', 'Option 2', 'Option 3'];
const regionOptions = ['Option 1', 'Option 2', 'Option 3'];
const ratingsOptions = ['Option 1', 'Option 2', 'Option 3'];


const items: MenuProps['items'] = [
  {
    label: 'Contact',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: (
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Questionnaire
      </a>
    ),
    key: 'alipay',
  },
  {
    label: 'Profile',
    key: 'SubMenu',
    icon: <UserOutlined />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
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
  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
      {/* 菜单部分 */}
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ display: 'flex', justifyContent: 'flex-end' }}/>

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