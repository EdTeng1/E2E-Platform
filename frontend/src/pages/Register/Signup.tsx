import React, { useState } from "react";
import { postData } from "../../service/http";
import { Button, Form, FormProps, Input, message } from "antd";
import logo from "../../assets/Genmab_Logo_Color_RGB.jpg";
import "./index.css";
import signupImg from "../../assets/signup.jpg";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
	const navigate = useNavigate();
	const [messageApi, contextHolder] = message.useMessage();

	const handleSignup = async (email: string, password: string) => {
		try {
			const response = await postData("/SignUp", { email, password });

			console.log({ email, password });

			if (!response.ok) {
				throw new Error("Network response was not ok. Status: " + response.status);
			}

			if (response.headers.get("Content-Type")?.includes("application/json")) {
				const result = await response.json(); // Converts the response to JSON
				// alert(result.message); // Assuming the message is part of the JSON response
				messageApi.open({
					type: "success",
					content: "sign up successful",
				});

				setTimeout(() => {
					navigate("/login");
				}, 2000);
				localStorage.setItem("username", email);
				localStorage.setItem("password", password);
			} else {
				// If not JSON, handle or show error differently
				const text = await response.text(); // Reading response as text to check what it is
				console.error("Non-JSON response:", text);
				alert("sign up failed");
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
		<div className='login-container'>
			{contextHolder}
			<div className='left'>
				<img src={signupImg} alt='' />
			</div>
			<div className='right-container'>
				<img src={logo} alt='' className={"login-logo"} style={{ height: "130px" }} />
				<Form
					style={{ width: "90%" }}
					labelCol={{ span: 6 }}
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

					<Form.Item wrapperCol={{ offset: 6 }}>
						<Button type='primary' htmlType='submit' style={{ width: "100%" }}>
							Sign Up
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default Signup;
