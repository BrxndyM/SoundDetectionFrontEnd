import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";
import MovieTable from "../Table/Table";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (values) => {
    setIsLoggedIn(true);
    console.log("logged in SUCCESSFULLY", values);
  };

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <MovieTable />
      ) : (
        <div className="login-box">
          <h2 className="bend-text">Login</h2>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Login;
