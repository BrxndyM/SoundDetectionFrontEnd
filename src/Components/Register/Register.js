import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import Login from "../Login/Login";
import './Register.css';

const SignUp = () => {
  const [isActive, setIsActive] = useState(false);

  const onFinish = async (values) => {
    const response = await fetch(
      "https://localhost:44311/api/services/app/Person/Create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const data = await response.json();
    if (response.success) {
      console.log("banner")
    };
    console.log(data);
    console.log("Updated ended");

    setIsActive(true);
  };

  return (
    <div className="signUpFirstDiv">
      <div className="twoogle" onClick={() => setIsActive(!isActive)}>
        {isActive ? "Sign Up" : "Login"}
        </div>
      {isActive ? (
        <Login />
      ) : (
        <div className="page-header">
          <div className="login-box">
            <h2 className="bend-text">FlickPicks</h2>
            <Form onFinish={onFinish}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name",
                  },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="surname"
                rules={[
                  {
                    required: true,
                    message: "Please input your surname",
                  },
                ]}
              >
                <Input placeholder="Surname" />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username",
                  },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number",
                  },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
              <Form.Item
                name="emailAddress"
                rules={[
                  {
                    required: true,
                    message: "Please input your email address",
                  },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password",
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Button
                htmlType="submit"
                className="submit-btn"
                style={{
                  backgroundColor: "#e76f51",
                  borderColor: "#e76f51",
                }}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
