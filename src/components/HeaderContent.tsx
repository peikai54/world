import React, { ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  title: string;
  button?: ReactNode;
}

const HeaderSection = styled.section`
  width: 100%;
  height: 52px;
  background-color: white;
  border-radius: 4px 4px 0 0;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
`;

const HeaderContent = (props: IProps) => {
  const { title, button } = props;

  return (
    <HeaderSection>
      <section style={{ fontWeight: "bold", fontSize: "16px" }}>
        {title}
      </section>
      <section>{button}</section>
    </HeaderSection>
  );
};

export default HeaderContent;
