import { Button, Form, Input, message } from "antd";
import React, { useContext } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import APIPostLogin from "@/api/PostLogin";
import { useHistory } from "react-router";

type ILoginForm = APIPostLogin.Params;

const { Item, useForm } = Form;

const LoginForm = () => {
  const [form] = useForm<ILoginForm>();
  const history = useHistory();
  const { run: submitLogin } = useRequest(APIPostLogin.request, {
    manual: true,
    onSuccess: (result) => {
      history.push("/");
    },
    throwOnError: true,
    onError: (err) => {
      message.error(err.message);
    },
  });

  const onFormFinish = () => {
    try {
      form.validateFields();
    } catch (error) {
      return;
    }
    const { username, password } = form.getFieldsValue();
    submitLogin({ username, password });
  };

  return (
    <>
      <Form form={form} onFinish={onFormFinish}>
        <Item name="username">
          <Input placeholder="请输入用户名" suffix={<UserOutlined />} />
        </Item>
        <Item name="password">
          <Input.Password
            placeholder="请输入密码"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Item>
        <Item>
          <Button block htmlType="submit" type="primary">
            登录
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default LoginForm;
