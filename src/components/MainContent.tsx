import React, { ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  children: ReactNode;
}

const MainSection = styled.section`
  padding: 20px;
  width: 100%;
  background-color: white;
`;

const MainContent = (props: IProps) => (
  <MainSection>{props.children}</MainSection>
);

export default MainContent;
