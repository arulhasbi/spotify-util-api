import React from "react";
import styled from "styled-components";

export class TrackList extends React.Component {
  render() {
    return (
      <TLWrapper className="drop-shadow-md rounded-lg py-3">
        <TLMaxWidth>
          <h1 className="text-3xl px-3">Results</h1>
          <TLTracks>{this.props.children}</TLTracks>
        </TLMaxWidth>
      </TLWrapper>
    );
  }
}

const TLWrapper = styled.div`
  font-family: "Work Sans";
  flex: 2.5;
  background: white;
`;
const TLMaxWidth = styled.div`
  h1 {
    font-weight: 700;
  }
`;

const TLTracks = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
`;
