import { Button, Form, Input, message } from "antd";
import { login } from "../../services/auth";
import { ILoginRequest } from "../../types/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

type FieldType = {
  username: string;
  password: string;
};

const LoginForm = (props: Props) => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    login({ email, password })
      .then(() => {
        message.success("Login sucessfully");
        navigate("/actual-data");
      })
      .catch((err: any) => {
        message.error(err.message);
      });
  };

  const handleFormSubmit = (values: FieldType) => {
    handleLogin(values.username, values.password);
  };

  return (
    <Form
      className="w-full"
      name="basic"
      style={{ maxWidth: 800 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      layout="vertical"
      onFinish={handleFormSubmit}
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-primary h-10 mb-0  mt-5"
        >
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
