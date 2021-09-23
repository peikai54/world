import React from "react";
import styled from "styled-components";

interface IProps {
  children: JSX.Element;
}

const WrapSection = styled.section`
  padding: 15px;
`;

const WrapContent = (props: IProps) => {
  const { children } = props;
  return <WrapSection>{children}</WrapSection>;
};

export default WrapContent;
