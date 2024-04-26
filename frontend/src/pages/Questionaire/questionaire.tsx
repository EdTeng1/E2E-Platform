import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { Typography, Input, Button, Row, Col, Form, Card, Select, Modal, Spin, DatePicker } from 'antd';
import { postData } from '../../service/http';
import './questionaire.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming', 'Washington D.C.'
];

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

interface ModalContent {
    title: string;
    content: string;
    success: boolean;
}


export const App: React.FC = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
    const [modalContent, setModalContent] = useState<ModalContent>({ title: '', content: '', success: false });
    const navigate = useNavigate();

    const showModal = (title: string, content: string, success: boolean) => {
        setIsModalVisible(true);
        setIsLoading(isLoading);
        if (!isLoading) {
            setModalContent({ title, content, success });
        }
    };

    const handleClose = () => {
        setIsModalVisible(false);
        if (modalContent.success) {
            // navigate('/');
            // console.log('Redirecting to main page...');
        } else {
            // form.resetFields();
        }
    };

    const onFinish = async (values: FormValues) => {
        console.log('Received values of form: ', values);
        try {
            const response = await postData('/questionaire', values);
            const data = await response.json(); // Assuming the response is in JSON format
            if (response.status === 200) {
                showModal('Success', 'Your information was submitted successfully!', true);
            } else if (response.status === 409) {
                // Handle the special status indicating a duplicate entry
                showModal('Duplicate Entry', data.message, false);
            } else {
                // Handle other errors with a generic message or based on the 'data.message'
                showModal('Error', data.message || 'An error occurred. Please try again.', false);
            }
        } catch (error) {
            console.error('Failed to submit form:', error);
            showModal('Error', 'Failed to submit your information. Please try again.', false);
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
                        label="Institution"
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
                            {US_STATES.map((state, index) => (
                                <Option key={index} value={state.toLowerCase().replace(/\s/g, '')}>{state}</Option>
                            ))}
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
                            label="Date of Engagement"
                            name="date"
                            rules={[{ required: true, message: "Please select the date of the engagement!" }]}>
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>

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
            <Modal title={modalContent.title || 'Processing'} open={isModalVisible} onOk={handleClose} onCancel={handleClose} footer={null}>
                {isLoading ? (
                    <Spin size="large" />
                ) : (
                    <>
                        <p>{modalContent.content}</p>
                        {modalContent.success && (
                            <Button type="primary" onClick={() => navigate('/')}>Return to Main Page</Button>
                        )}
                    </>
                )}
            </Modal>
        </main>
    );
}

export default App;