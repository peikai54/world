import React from "react";
import styled from "styled-components";
import LoginForm from "./login-form";

const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  padding-top: 150px;
  .main {
    width: 500px;
    text-align: center;
    .title {
      font-size: 70px;
      margin-bottom: 15px;
      color: rgb(0, 132, 255);
    }
  }
  .form-section {
    width: 360px;
  }

  .footer {
    color: #1890ff;
  }
`;

const Login = () => {
  return (
    <LoginSection>
      <main className="main">
        <p className="title">WORLD</p>
      </main>
      <section className="form-section">
        <LoginForm />
      </section>
      <section className="footer">
        <a>以游客身份游览</a>
      </section>
    </LoginSection>
  );
};

export default Login;
