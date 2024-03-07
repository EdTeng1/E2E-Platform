import React from 'react';
import { Typography, Input, Button, Row, Col, Form, Card } from 'antd';
import './questionaire.css';

const { Title } = Typography;
const { TextArea } = Input;

interface FormValues {
    title: string;
    firstName: string;
    lastName: string;
    institutionName?: string;
    state?: string;
    city?: string;
    phoneNumber?: string;
    email?: string;
    question1?: string;
    question2?: string;
    question3?: string;
  }
  

export const App: React.FC = () => {
    const [form] = Form.useForm();

    // const isFormFilled = () => {
    //     return form.isFieldsTouched(true) && form.getFieldsError().filter(({ errors }) => errors.length).length === 0;
    // };

    const onFinish = async (values : FormValues) => {
        console.log('Received values of form: ', values);
        try {
            const response = await fetch('/questionaire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Submission successful', responseData);
            // Here, you can add any follow-up actions upon successful submission
        } catch (error) {
            console.error('Failed to submit form:', error);
            // Handle submission error (e.g., show a notification to the user)
        }
    };



    return (
        <main className="main-content">
            <Card className="form-card" bordered={false}>
                <Title level={2}>KOL Records</Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={errorInfo => console.log('Failed:', errorInfo)}
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
                        {/* <Col span={8}>
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
                        </Col> */}
                    </Row>
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
                </Form>
            </Card>
        </main>
    );
}

export default App;