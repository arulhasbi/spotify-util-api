import React from "react";
import styled from "styled-components";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.onChangePlaylistName = this.onChangePlaylistName.bind(this);
  }

  onChangePlaylistName(e) {
    this.props.onChangePlaylistName(e.target.value);
  }

  render() {
    return (
      <PWrapper
        className="drop-shadow-md rounded-lg py-3

      "
      >
        <PMaxWidth className="flex flex-col">
          <input
            type="text"
            className="text-3xl px-3"
            placeholder="Name your playlist"
            onChange={this.onChangePlaylistName}
          />
          <TLTracks>{this.props.children}</TLTracks>
          <button
            className="flex self-center py-1 px-2 text-base items-center gap-x-3"
            type="button"
            onClick={this.props.onCreatePlaylist}
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
  > input {
    font-family: "Work Sans";
    font-weight: 700;
  }
  button:last-of-type {
    font-weight: 900;
  }
`;

const TLTracks = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
`;
