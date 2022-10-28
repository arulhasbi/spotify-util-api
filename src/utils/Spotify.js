import { nanoid } from "nanoid/non-secure";

const clientID = "96a1e8fce81c4327a788ffc574c86413";
const redirectURI = "http://localhost:3000/callback/";
const spotifyURL = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientID}&redirect_uri=${redirectURI}`;
let baseURL = "https://api.spotify.com/v1";
let token = undefined;
let expiresin = undefined;

export const Spotify = {
  getAccessToken() {
    if (token) {
      return token;
    }
    const tokenURL = window.location.href.match(/access_token=([^&]*)/);
    const expiresinURL = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenURL && expiresinURL) {
      token = tokenURL[1];
      expiresin = expiresinURL[1];
      window.setTimeout(() => {
        token = "";
      }, expiresin * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      window.location = spotifyURL;
    }
  },
  async search(term) {
    const searchURL = `${baseURL}/search?type=track&q=${term}`;
    const response = await fetch(searchURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseJSON = await response.json();
    let tracks = responseJSON.tracks.items.map((track) => {
      return {
        id: nanoid(),
        title: track.name,
        album: track.album.name,
        artist: track.artists[0].name,
      };
    });
    return tracks;
  },
};
