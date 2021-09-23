import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import React, { useState } from "react";
import "./index.less";
import Logo from "../svgs/product-logo";
import styled from "styled-components";
import { useHistory } from "react-router";

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

const { Sider, Header } = Layout;

const AppContainer = (props: IProps) => {
  const { children } = props;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const history = useHistory();

  const ToNav = (path: string) => {
    history.push(path);
  };

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
          <Menu.Item
            key="1"
            icon={<UnorderedListOutlined />}
            onClick={() => ToNav("/task")}
          >
            任务管理
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
        <section
          style={{
            overflow: "auto",
            height: "100%",
            backgroundColor: "#eff2f5",
          }}
        >
          {children}
        </section>
      </Layout>
    </Layout>
  );
};

export default AppContainer;
