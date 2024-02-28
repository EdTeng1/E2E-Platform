import React, {useState} from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps,  } from 'antd';
import { Breadcrumb, Layout, Menu, theme,Card, Pagination } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Meta } = Card;

const items: MenuProps['items'] = [
    {
      label: 'HOME',
      key: 'mail',
    },
    {
      label: "QUESTIONNAIRE",
      key: 'alipay',
    },
    {
      key: 'SubMenu',
      icon: <UserOutlined />,
      children: [
        {
          type: 'group',
          children: [
            {
              label: 'DOCUMENTS',
              key: 'setting:1',
            },
            {
              label: 'FAVORITES',
              key: 'setting:2',
            },
            {
              label: 'OTHER FEATURES',
              key: 'setting:3',
            }
          ],
        },
      ],
    },
  
  ];

const ts = ["Specialization", "Region", "Ratings"]
const ts_c = [["Clinical", "Care", "Administrative", "Auxiliary"], ["Asia", "Europe", "America", "Australia"], ["A", "B", "C", "D"]]
const Filter: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
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
  },
);

const App: React.FC = () => {
    const [current, setCurrent] = useState('');

    const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

    let mt = 0;
    const card_list = new Array();
    card_list.push(<Card
      hoverable
      style={{ width: 240, marginBottom: 16 , marginInline: mt}}
      cover={<img alt="example" height={350} src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.doubanio.com%2Fview%2Fphoto%2Fm%2Fpublic%2Fp2292568076.jpg&refer=http%3A%2F%2Fimg9.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1711504884&t=e0a39d1a707e371ae7290ccc4fd9f9f2" />}
      key={0}
    >
        <Meta title="Roderic Guigo" description="Cancer Center" />
        <p>Score: 80</p>
    </Card>)
    card_list.push(<Card
      hoverable
      style={{ width: 240, marginBottom: 16 , marginInline: mt }}
      cover={<img alt="example" height={350} src="https://img2.baidu.com/it/u=3195485747,1001404537&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667" />}
      key={1}
    >
        <Meta title="Tom Snijders" description="Outpatient Department" />
        <p>Score: 95</p>
    </Card>)
    card_list.push(<Card
      hoverable
      style={{ width: 240, marginBottom: 16 , marginInline: mt }}
      cover={<img alt="example" height={350} src="https://hbimg.b0.upaiyun.com/dc02ea94091c77f8cbcf0efd08440e7d8dd86d9d1c677-FKu2Xo_fw658" />}
      key={2}
    >
        <Meta title="Emma Watson" description="Clinical Department" />
        <p>Score: 90</p>
    </Card>)
    card_list.push(<Card
      hoverable
      style={{ width: 240, marginBottom: 16 , marginInline: mt }}
      cover={<img alt="example" height={350} src="https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2022%2F0520%2F17e832c1j00rc67qo005lc000xc015nm.jpg&thumbnail=660x2147483647&quality=80&type=jpg" />}
      key={3}
    >
        <Meta title="Tom Whyntie" description="Dentistry" />
        <p>Score: 80</p>
    </Card>)
    card_list.push(<Card
      hoverable
      style={{ width: 240, marginBottom: 16 , marginInline: mt }}
      cover={<img alt="example" height={350} src="https://t12.baidu.com/it/u=177421646,526791588&fm=170&s=CDCCA044CC025955492C0DB203008093&w=600&h=709&img.JPEG" />}
      key={4}
    >
        <Meta title="Christopher Murray" description="Nursing Department" />
        <p>Score: 85</p>
    </Card>)
    card_list.push(<Card
      hoverable
      style={{ width: 240, marginBottom: 16 , marginInline: mt }}
      cover={<img alt="example" height={350} src="https://5b0988e595225.cdn.sohucs.com/images/20170919/78480444e9e84d0c8ceb491e5bb765cf.jpeg" />}
      key={5}
    >
        <Meta title="Carlo Dallapiccola" description="Obstetrics and Gynecology" />
        <p>Score: 90</p>
    </Card>)
    card_list.push(<Card
      hoverable
      style={{ width: 240, marginBottom: 16 , marginInline: mt }}
      cover={<img alt="example" height={350} src="https://www.qubaobei.com/uploadnew/weekend/2018/7/6/19/1530875097788.png" />}
      key={6}
    >
        <Meta title="Chris Sander" description="Emergency Department" />
        <p>Score: 80</p>
    </Card>)
    card_list.push(<Card
      hoverable
      style={{ width: 240, marginBottom: 16 , marginInline: mt }}
      cover={<img alt="example" height={350} src="https://t9.baidu.com/it/u=406123646,979845029&fm=193" />}
      key={7}
    >
        <Meta title="Cyrus Cooper" description="Pediatrics" />
        <p>Score: 95</p>
    </Card>)

  return (
    <Layout>
      <Header>
      {/* 菜单部分 */}
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ display: 'flex', justifyContent: 'flex-end' }}/>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Layout
          style={{ padding: '24px 0' }}
        >
          <Sider width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={Filter}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            {/* 卡片内容 */}
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                {/* {new Array(9).fill(null).map((_, index) => (
                    <Card
                        hoverable
                        style={{ width: 240, marginBottom: 16 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        key={index}
                    >
                        <Meta title="User Name" description="User Occupation" />
                        <p>Score: 80</p>
                    </Card>
                ))} */
                card_list.slice(0, 4)
                }
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                {/* {new Array(9).fill(null).map((_, index) => (
                    <Card
                        hoverable
                        style={{ width: 240, marginBottom: 16 }}
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        key={index}
                    >
                        <Meta title="User Name" description="User Occupation" />
                        <p>Score: 80</p>
                    </Card>
                ))} */
                card_list.slice(4, 8)
                }
            </div>
            {/* 分页 */}
            <Pagination defaultCurrent={1} total={50} style={{ textAlign: 'center', margin: '20px 0' }} />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;