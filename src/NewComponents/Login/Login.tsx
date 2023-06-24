
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Card } from 'antd';
// import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../providers/SignIn/index'
import { ILogin, IUser } from '../../providers/SignIn/context';
import './styles.css';
import { useNavigate } from 'react-router-dom';

// import { useCartState } from '../Provider/cart';
import withHome from '../../Hooks/Auth/WithHome';


const Login = () => {

    const { loginUser } = useUser();
    const [userNameOrEmailAddress, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const {push} = useRouter();
    // const {cartItems}=useCartState()

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        loginUser(values as ILogin)
        //   {cartItems?.length?push('/cart'): push('/')}
    };

    let navigate = useNavigate();

    return (
        <>
            <div className="background" id="background">
               
                    <div className="container" id="container">

                        <Form
                            name="normal_login"
                            className="loginform"
                            initialValues={{
                                rememberClient: true,
                            }}
                            onFinish={onFinish}

                        >
                            <h2 id="header"> SoundAlert</h2>
                            <h3 id="">Welcome back!</h3>
                            <Form.Item
                                name="userNameOrEmailAddress"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                                className="input"
                                id="input"

                            >
                                <Input
                                    className="inputag"
                                    id="inputag"
                                    type="text"
                                    prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                                className="input"
                                id="input"

                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    className="inputag"
                                    id="inputag"
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                            </Form.Item>
                            <Form.Item name="rememberClient"  >
                                <Checkbox className="check" >Remember me</Checkbox>
                                <a href="" className="loginforgot" id="loginforget">
                                    Forgot password
                                </a>
                            </Form.Item>

                            <Form.Item name={''}>
                                <Button ghost htmlType="submit"
                                    id="loginbutton"
                                >
                                    Log in
                                </Button>
                                <br />
                                <br />
                                <div className="regLink" id="regLink">


                                    <a onClick={() => navigate('/Register')}>Create Account</a>
                                </div>

                            </Form.Item>
                        </Form>
                    </div>
                
            </div>
        </>
    );
}

export default withHome(Login);