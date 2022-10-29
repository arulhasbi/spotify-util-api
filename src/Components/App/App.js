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
      playlistName: "",
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAddToPlaylist = this.handleAddToPlaylist.bind(this);
    this.handleRemoveFromPlaylist = this.handleRemoveFromPlaylist.bind(this);
    this.handlChangePlaylistName = this.handlChangePlaylistName.bind(this);
    this.handleCreatePlaylist = this.handleCreatePlaylist.bind(this);
    this.resetState = this.resetState.bind(this);
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

  handleRemoveFromPlaylist(id) {
    let tracks = this.state.selectedTracks;
    tracks = tracks.filter((track) => {
      return track.id !== id;
    });
    this.setState({
      selectedTracks: tracks,
    });
  }

  handlChangePlaylistName(name) {
    if (name !== "") {
      this.setState({
        playlistName: name,
      });
    } else {
      console.log("Make sure you fill out the playlist name!");
    }
  }

  async resetState() {
    await this.setState({
      tracks: [],
      selectedTracks: [],
      playlistName: "",
    });
  }

  async handleCreatePlaylist() {
    const playlistName = this.state.playlistName;
    const selectedTracks = this.state.selectedTracks;
    const response = await Spotify.saveToPlaylist(playlistName, selectedTracks);
    if (response.snapshot_id) {
      window.alert(`${playlistName} succesfully created!`);
      await this.resetState();
      window.location.reload();
    } else {
      console.log("something wrong, please try later.");
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
          id={track.id}
          uri={track.uri}
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
          id={track.id}
          uri={track.uri}
          state="playlist"
          onRemove={this.handleRemoveFromPlaylist}
        ></Track>
      );
    });
    return (
      <APPWrapper>
        <SuperHeader />
        <SearchBar onSearch={this.handleSearch} />
        <APPMainWrapper className="px-3">
          <TrackList>{tracks}</TrackList>
          <Playlist
            onChangePlaylistName={this.handlChangePlaylistName}
            onCreatePlaylist={this.handleCreatePlaylist}
          >
            {addedTracks}
          </Playlist>
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
