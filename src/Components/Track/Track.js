import React from "react";
import styled from "styled-components";

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd() {
    this.props.onAdd({
      title: this.props.title,
      album: this.props.album,
      artist: this.props.artist,
    });
  }

  render() {
    return (
      <TWrapper className={this.props.bg + " p-3"}>
        <TMaxWidth className="flex justify-between items-center">
          <div>
            <h3 className="text-xl">{this.props.title}</h3>
            <p>
              {this.props.artist} | {this.props.album}
            </p>
          </div>
          {this.props.state === "tracklist" && (
            <button type="button" onClick={this.onAdd}>
              <span className="material-symbols-outlined">add_circle</span>
            </button>
          )}
          {this.props.state === "playlist" && (
            <button type="button">
              <span class="material-symbols-outlined">cancel</span>
            </button>
          )}
        </TMaxWidth>
      </TWrapper>
    );
  }
}

const TWrapper = styled.div`
  color: white;
`;
const TMaxWidth = styled.div`
  h3 {
    font-weight: 500;
  }
  p {
    font-weight: 400;
  }
`;
