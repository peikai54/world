import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import React, { useState } from "react";
import "./app-container.less";
import Logo from "./svgs/product-logo";
import styled from "styled-components";

interface IProps {
  children: JSX.Element;
}

const LogoSection = styled.section`
  background-color: #002140;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    margin-left: 12px;
  }
`;

const { Sider, Header, Content } = Layout;

const AppContainer = (props: IProps) => {
  const { children } = props;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <Layout style={{ height: "100%" }}>
      <Sider collapsed={isCollapsed} collapsible trigger={null}>
        <LogoSection>
          <div className="logo-svg">
            <Logo />
          </div>
          {!isCollapsed && <div className="title">我的世界</div>}
        </LogoSection>
        <Menu mode="inline" defaultSelectedKeys={["1"]} theme="dark">
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "0 20px",
            height: "48px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <section
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ cursor: "pointer" }}
          >
            {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </section>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppContainer;
