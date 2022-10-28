import React from "react";
import styled from "styled-components";

export class Playlist extends React.Component {
  render() {
    return (
      <PWrapper
        className="drop-shadow-md rounded-lg py-3

      "
      >
        <PMaxWidth className="flex flex-col">
          <h1 className="text-3xl px-3">Playlist</h1>
          <TLTracks>{this.props.children}</TLTracks>
          <button
            className="flex self-center py-1 px-2 text-base items-center gap-x-3"
            type="button"
          >
            Click me to save
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </PMaxWidth>
      </PWrapper>
    );
  }
}

const PWrapper = styled.div`
  flex: 2;
  background: white;
  position: sticky;
  top: 0;
  right: 0;
  align-self: start;
`;

const PMaxWidth = styled.div`
  h1 {
    font-family: "Work Sans";
    font-weight: 700;
  }
  button:last-of-type:hover {
  }
  button:last-of-type {
    font-weight: 900;
  }
`;

const TLTracks = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
`;
