import styled from "styled-components";
import React from "react";

export class SuperHeader extends React.Component {
  render() {
    return (
      <SHWrapper className="bg-indigo-900 shadow-md">
        <SHMaxWidth>
          <SHLogo>
            Ja<span className="text-indigo-400">mmm</span>ing
          </SHLogo>
        </SHMaxWidth>
      </SHWrapper>
    );
  }
}

const SHWrapper = styled.div`
  margin-bottom: 140px;
`;

const SHMaxWidth = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SHLogo = styled.span`
  font-family: "Poppins";
  font-weight: 700;
  font-size: 2rem;
  color: white;
`;
