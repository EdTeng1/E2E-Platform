import React, { useState } from "react";
import { postData } from "../../service/http";
import { Button, Form, FormProps, Input } from "antd";
import logo from "../../assets/Genmab_Logo_Color_RGB.jpg";
import "./index.css";

const Signup: React.FC = () => {
	const handleSignup = async (email: string, password: string) => {
		try {
			const response = await postData("/SignUp", { email, password });

			console.log({ email, password });

			if (!response.ok) {
				throw new Error("Network response was not ok. Status: " + response.status);
			}

			if (response.headers.get("Content-Type")?.includes("application/json")) {
				const result = await response.json(); // Converts the response to JSON
				alert(result.message); // Assuming the message is part of the JSON response
			} else {
				// If not JSON, handle or show error differently
				const text = await response.text(); // Reading response as text to check what it is
				console.error("Non-JSON response:", text);
				alert("Received non-JSON response from the server.");
			}
		} catch (error) {
			console.error("Signup Error:", error);
			if (error instanceof Error) {
				alert(error.message);
			} else {
				alert("An unexpected error occurred");
			}
		}
	};

	type FieldType = {
		Email?: string;
		password?: string;
	};

	const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
		console.log("Success:", values);
		handleSignup(values.Email!, values.password!);
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
						Sign Up
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Signup;
