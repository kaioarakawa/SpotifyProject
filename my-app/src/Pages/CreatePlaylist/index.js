import React, { useState } from "react";
import { debounce } from "lodash";
import SearchBar from "../../Components/SearchBar/index";
import SearchResults from "../../Components/SearchResults/index";
import PlayList from "../../Components/Playlist/index";
import Swal from "sweetalert2";
import api from "../../Services/api";
import "./styles.css";

export default function CreatePlailyst() {
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [music, setMusic] = useState([]);
  const token = localStorage.getItem("token");
  const idUser = localStorage.getItem("userId");

  async function load(value) {
    const response = await api.get(`/search?q=${value}&type=track`);
    console.log(response.data.tracks.items);
    setMusic(response.data.tracks.items);
  }

  async function savePlaylistInSpotify(playlistName, trackURIs) {
    let playlistID;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    fetch(`https://api.spotify.com/v1/users/${idUser}/playlists`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ name: playlistName }),
    })
      .then(
        (response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Request failed!");
        },
        (networkError) => {
          console.log(networkError.message);
        }
      )
      .then((jsonResponse) => {
        playlistID = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/users/${idUser}/playlists/${playlistID}/tracks`,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ uris: trackURIs }),
          }
        )
          .then(
            (response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Request failed!");
            },
            (networkError) => {
              console.log(networkError.message);
            }
          )
          .then((jsonResponse) => {
            Swal.fire({
              title: "Playlist created",
              confirmButtonText: "Ok!!",
            });
          });
      });
  }

  const delayedSearch = debounce((value) => {
    load(value);
  }, 100);

  function addTrack(track) {
    if (!playlistTracks.find((trackIndex) => trackIndex.id === track.id)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  }

  function removeTrack(track) {
    let newTracks = playlistTracks.filter(
      (trackIndex) => trackIndex.id !== track.id
    );
    setPlaylistTracks(newTracks);
  }

  function updatePlaylistName(name) {
    setPlaylistName(name);
  }

  function savePlaylist() {
    let tracks = playlistTracks;
    if (tracks.length && playlistTracks) {
      let trackURIs = tracks.map((trackIndex) => trackIndex.uri);
      savePlaylistInSpotify(playlistName, trackURIs).then(() => {
        updatePlaylistName("New Playlist");
        setPlaylistTracks([]);
        document.getElementById("Playlist-name").value = playlistName;
      });
    }
  }

  return (
    <div>
      <div className="playlistMain">
        <SearchBar onSearch={delayedSearch} />
        <div className="playlist">
          <SearchResults searchResults={music} onAdd={addTrack} />
          <PlayList
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}
