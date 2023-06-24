import {
    Button,
    Checkbox,
    Form,
    Input,
    Card,
  } from 'antd';
  import React, { useState } from 'react';
  import withHome from '../../Hooks/Auth/WithHome';
  import { useUser } from '../../providers/SignIn';
  import './styles.css';
 

  
  const formItemLayout = {
    labelCol: {
      sm: {
        span: 5,
        align: 'right',
      },
    },
    wrapperCol: {
      sm: {
        span: 16,
        offset: 1,
  
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 10,
        offset: 6,
      },
    },
  };
  
  const Register = () => {
    const [form] = Form.useForm();
    const { createUser } = useUser();
  
    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
      createUser(values);
    };
  
    const [userName, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
  
    return (
      <div className="main">
        <Card title="Register" className="card" id="card"type='inner'>
        {/* <div className="container" id="container"> */}
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            className="regContainer"
            style={{ color: 'white' }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  message: 'The input is not valid Name!',
                },
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} className="inputag" />
            </Form.Item>
  
            <Form.Item
              name="surname"
              label="Surname"
              rules={[
                {
                  message: 'The input is not valid Surname!',
                },
                {
                  required: true,
                  message: 'Please input your Surname!',
                },
              ]}
            >
              <Input placeholder="Surname" onChange={(e) => setSurname(e.target.value)} value={surname} className="inputag" />
            </Form.Item>
  
            <Form.Item
              name="userName"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={userName} className="inputag" />
            </Form.Item>
  
            <Form.Item
              name="emailAddress"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input placeholder='E-mail@example.com' onChange={(e) => setEmailAddress(e.target.value)} value={emailAddress} className="inputag" />
            </Form.Item>
  
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input
                placeholder="+27812345678"
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="inputag"
              />
            </Form.Item>
  
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} className="inputag" />
            </Form.Item>
  
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
  
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Password" className="inputag" />
            </Form.Item>
  
            <Form.Item
              className="agreement"
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox >
                I have read the <a href="">Terms and Conditions</a>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType="submit" style={{ backgroundColor: '#e76f51' }}  >
                Register
              </Button>
              <Button danger type='primary' htmlType="submit" className="button" style={{ backgroundColor: '#e76f51' }} >
                Cancel
              </Button>
            </Form.Item>
            <Form.Item className="login" >
              <p className="link">Already have a account? <a href='../login'>Login</a></p>
            </Form.Item>
  
          </Form>
          {/* </div> */}
        </Card>
      </div>
    );
  };
  export default withHome(Register);