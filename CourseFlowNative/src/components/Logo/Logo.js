import React from "react";
import logo from "./Logo.png";
import styled from "styled-components";

const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 30px;
  text-align: center;
`;

export default function Logo() {
  return (
    <div>
      <StyledImg src={logo} alt="logo" />
    </div>
  );
}
