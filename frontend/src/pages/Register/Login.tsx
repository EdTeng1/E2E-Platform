import React, { useState } from "react";
import { postData } from "../../service/http";
import { Button, Checkbox, Col, Form, FormProps, Input, Row } from "antd";
import logo from "../../assets/Genmab_Logo_Color_RGB.jpg";
import "./index.css";

const Login: React.FC = () => {
	const handleLogin = async (email: string, password: string) => {
		try {
			const response = await postData("/SignIn", { email, password });

			if (!response.ok) {
				// Handle non-2xx responses here
				const errorData = await response.json();
				alert(errorData.message);
				return; // Stop further execution in case of error response
			}

			const result = await response.json();
			localStorage.setItem("token", result.access_token); // Assuming the token is stored in result.access_token
			alert(result.message);
			// Optionally redirect the user or update global state here
		} catch (error) {
			console.error("Login error:", error);
			alert("An unexpected error occurred");
		}
	};

	type FieldType = {
		Email?: string;
		password?: string;
	};

	const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
		console.log("Success:", values);
		handleLogin(values.Email!, values.password!);
	};

	const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className='container'>
			<img src={logo} alt='' className={"login-logo"} />
			<Form
				style={{ width: "40vw" }}
				labelCol={{ span: 4 }}
				name='basic'
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'>
				<Form.Item<FieldType>
					label='Email'
					name='Email'
					rules={[{ required: true, message: "Please input your username!" }]}>
					<Input placeholder='Email' />
				</Form.Item>

				<Form.Item<FieldType>
					label='Password'
					name='password'
					rules={[{ required: true, message: "Please input your password!" }]}>
					<Input.Password placeholder='Password' />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 4 }}>
					<Button type='primary' htmlType='submit' style={{ width: "100%" }}>
						Sign In
					</Button>
					<Button type='primary' style={{ width: "100%", marginTop: "16px" }} onClick={() => {}}>
						{/* Sign Up */}
						<a href='/signup'>Sign Up</a>
					</Button>
				</Form.Item>
				{/* <Row>
					<Col offset={4}>
						<a className='text-info' href='/signup'>
							Sign Up
						</a>
					</Col>
				</Row> */}
			</Form>
		</div>
	);
};

export default Login;
