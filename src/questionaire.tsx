import React from 'react';
import { Typography, Input, Button, Row, Col, Form, Card } from 'antd';
import './questionaire.css';

const { Title } = Typography;
const { TextArea } = Input;

export const App: React.FC = () => {
    const [form] = Form.useForm();

    const isFormFilled = () => {
        // Checks whether the fields have been touched and there are no errors.
        return form.isFieldsTouched(true) && form.getFieldsError().filter(({ errors }) => errors.length).length === 0;
    };
    return (
        <main className="main-content">
            <Card className="form-card" bordered={false}>
                <Title level={2}>KOL Records</Title>
                <Form
                    layout="vertical"
                    onFinish={(values) => {
                        console.log('Received values of form: ', values);
                    }}
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[{ required: true, message: 'Please input your title!' }]}
                            >
                                <Input placeholder="Title" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: 'Please input your first name!' }]}
                            >
                                <Input placeholder="First name" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: 'Please input your last name!' }]}
                            >
                                <Input placeholder="Last name" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Institution Name"
                                name="institutionName"
                                rules={[{ required: true, message: 'Please input your institution name!' }]}
                            >
                                <Input placeholder="Institution Name" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="State"
                                name="state"
                                rules={[{ required: true, message: 'Please input your state!' }]}
                            >
                                <Input placeholder="State" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[{ required: true, message: 'Please input your city!' }]}
                            >
                                <Input placeholder="City" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Phone Number"
                                name="phoneNumber"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input placeholder="Phone number" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Email Address"
                                name="email"
                                rules={[{ required: true, message: 'Please input your email address!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                            >
                                <Input placeholder="Email Address" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item shouldUpdate={true}>
                                {() => (
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        // Only enable the Match button if the form is filled out
                                        // disabled={!isFormFilled()}
                                    >
                                        Match
                                    </Button>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div className="questions">
                    <Title level={3}>Questions</Title>
                    <Form.Item label="Question 1" name="question1">
                        <TextArea rows={4} placeholder="Enter here" />
                    </Form.Item>
                    <Form.Item label="Question 2" name="question2">
                        <TextArea rows={4} placeholder="Enter here" />
                    </Form.Item>
                    <Form.Item label="Question 3" name="question3">
                        <TextArea rows={4} placeholder="Enter here" />
                    </Form.Item>
                </div>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Card>
        </main>
    );
}

export default App;