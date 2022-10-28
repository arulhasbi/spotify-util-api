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
      selectedTracks: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddToPlaylist = this.handleAddToPlaylist.bind(this);
  }

  async handleSearch(term) {
    try {
      let tracks = await Spotify.search(term);
      this.setState({
        tracks,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleAddToPlaylist(track) {
    const selectedTracks = this.state.selectedTracks;
    selectedTracks.push(track);
    this.setState({
      selectedTracks,
    });
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
          onAdd={this.handleAddToPlaylist}
        ></Track>
      );
    });
    const addedTracks = this.state.selectedTracks.map((track) => {
      return (
        <Track
          bg="even:bg-indigo-400 odd:bg-indigo-600"
          title={track.title}
          album={track.album}
          artist={track.artist}
          key={nanoid()}
          state="playlist"
        ></Track>
      );
    });
    return (
      <APPWrapper>
        <SuperHeader />
        <SearchBar onSearch={this.handleSearch} />
        <APPMainWrapper className="px-3">
          <TrackList>{tracks}</TrackList>
          <Playlist>{addedTracks}</Playlist>
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
