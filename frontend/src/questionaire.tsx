import React from 'react';
import { Typography, Input, Button, Row, Col, Form, Card, Select } from 'antd';
import './questionaire.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

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

    const onFinish = async (values: FormValues) => {
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
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please select your title!' }]}
                    >
                        <Select placeholder="Select a title">
                            <Option value="mr">Mr</Option>
                            <Option value="mrs">Mrs</Option>
                            <Option value="ms">Ms</Option>
                            <Option value="dr">Dr</Option>
                            {/* Add more options as needed */}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Pronouns"
                        name="pronouns"
                        rules={[{ required: true, message: 'Please select your pronouns!' }]}
                    >
                        <Select placeholder="Select pronouns">
                            <Option value="he/him">He/Him</Option>
                            <Option value="she/her">She/Her</Option>
                            <Option value="they/them">They/Them</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Institute"
                        name="institute"
                        rules={[{ required: true, message: 'Please input your institute!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="State"
                        name="state"
                        rules={[{ required: true, message: 'Please select your state!' }]}
                    >
                        <Select placeholder="Select a state">
                            {/* Replace the options below with actual states */}
                            <Option value="state1">State 1</Option>
                            <Option value="state2">State 2</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'Please input your city!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Zip"
                        name="zip"
                        rules={[{ required: true, message: 'Please input your zip code!' }]}
                    >
                        <Input placeholder="Zip code" />
                    </Form.Item>

                    <Form.Item
                        label="Phone Number"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input placeholder="Phone number" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <div className="Engagement">
                        <Title level={3}>Engagement</Title>
                        <Form.Item
                            label="Engagement (A)"
                            name="engagementA"
                            rules={[{ required: true, message: 'Please select your engagement type!' }]}
                        >
                            <Select placeholder="Select an engagement type">
                                <Option value="inPersonMeeting">In-Person Meeting</Option>
                                <Option value="virtualMeeting">Virtual Meeting</Option>
                                <Option value="phoneCall">Phone Call</Option>
                                <Option value="conference">Conference</Option>
                                <Option value="advisoryBoard">Advisory Board</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Function"
                            name="functionA"
                            rules={[{ required: true, message: 'Please select a function!' }]}
                        >
                            <Select placeholder="Select a function">
                                <Option value="r&d">R&D</Option>
                                <Option value="devOps">Development Operations</Option>
                                <Option value="medical">Medical</Option>
                                <Option value="commercial">Commercial</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Notes"
                            name="notes"
                        >
                            <Input.TextArea rows={4} placeholder="Enter notes here" />
                        </Form.Item>

                        <Form.Item
                            label="Follow-up Requested (B)"
                            name="followUpRequested"
                            rules={[{ required: true, message: 'Please select your follow-up engagement type!' }]}
                        >
                            <Select placeholder="Select a follow-up engagement type">
                                <Option value="inPersonMeeting">In-Person Meeting</Option>
                                <Option value="virtualMeeting">Virtual Meeting</Option>
                                <Option value="phoneCall">Phone Call</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Function"
                            name="functionB"
                            rules={[{ required: true, message: 'Please select a function!' }]}
                        >
                            <Select placeholder="Select a function">
                                <Option value="r&d">R&D</Option>
                                <Option value="devOps">Development Operations</Option>
                                <Option value="medical">Medical</Option>
                                <Option value="commercial">Commercial</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Information Requested"
                            name="informationRequested"
                        >
                            <Input.TextArea rows={4} placeholder="Enter information requested here" />
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