import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../Services/api";
import getHashParams from "../../Utils/getHashParams";
import defaultImage from "../../Assets/default-image.jpg";
import "./styles.css";

const token = getHashParams().access_token;

export default function Home() {
  if (token !== undefined) {
    localStorage.setItem("token", token);
  }
  const [playlists, setPlaylists] = useState([]);
  const [next, setNext] = useState("");

  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function loadPlaylists() {
      const response = await api.get("/me/playlists?limit=50");

      setPlaylists((oldValue) => [...oldValue, ...response.data.items]);
      setNext(response.data.next);

      setLoad(false);
    }

    loadPlaylists();
  }, []);

  async function loadMore() {
    const endpointURL = next.replace("https://api.spotify.com/v1", "");

    const response = await api.get(endpointURL);

    setPlaylists([...playlists, ...response.data.items]);
    setNext(response.data.next);
  }

  return (
    <>
      {load ? (
        <h2 className="loading">Carregando...</h2>
      ) : (
        <div id="playlists" className="container">
          <h2>Suas playlists</h2>
          <div className="grid-template">
            {playlists.map((playlist) => (
              <div className="item" key={playlist.id}>
                <Link to={`/playlist/id=${playlist.id}`}>
                  <div
                    className="cover"
                    style={{
                      backgroundImage: `url(${
                        playlist.images.length === 0
                          ? defaultImage
                          : playlist.images[0].url
                      })`,
                    }}
                  />
                  <div className="name-and-description">
                    <span className="name">{playlist.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {next && (
            <div className="load-more">
              <button type="button" onClick={loadMore}>
                Carregar mais
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
