import "./App.css";
import styled from "styled-components";
import "../SuperHeader/SuperHeader";
import { SuperHeader } from "../SuperHeader/SuperHeader";
import { SearchBar } from "../SearchBar/SearchBar";
import { TrackList } from "../TrackList/TrackList";
import { Playlist } from "../Playlist/Playlist";
import { Track } from "../Track/Track";
import React from "react";
import { Spotify } from "../../utils/Spotify";
import { nanoid } from "nanoid/non-secure";

Spotify.getAccessToken();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  async handleSearch(term) {
    try {
      let response = await Spotify.search(term);
      this.setState({
        tracks: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const tracks = this.state.tracks.map((track) => {
      return (
        <Track
          bg="even:bg-indigo-600 odd:bg-indigo-400"
          title={track.title}
          album={track.album}
          artist={track.artist}
          key={nanoid()}
          state="tracklist"
        ></Track>
      );
    });
    return (
      <APPWrapper>
        <SuperHeader />
        <SearchBar onSearch={this.handleSearch} />
        <APPMainWrapper className="px-3">
          <TrackList>{tracks}</TrackList>
          <Playlist></Playlist>
        </APPMainWrapper>
      </APPWrapper>
    );
  }
}

const APPWrapper = styled.div``;
const APPMainWrapper = styled.div`
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 115px;
  display: flex;
  gap: 42px;
  flex-wrap: wrap;
`;

export default App;
