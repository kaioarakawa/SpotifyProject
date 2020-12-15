import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../Services/api";
import defaultImage from "../../Assets/default-image.jpg";
import "./styles.css";


export default function User() {
  const [user, setUser] = useState([]);
  const [userPicture, setUserPicture] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [next, setNext] = useState("");

  const [load, setLoad] = useState(true);

  const id = useParams().userId;

  useEffect(() => {
    async function loadUser() {
      const response = await api.get(`/me`);

      setUser(response.data);

      if (response.data.images.length === 0) {
        setUserPicture(defaultImage);
      } else {
        setUserPicture(response.data.images[0].url);
      }

      setLoad(false);
    }

    async function loadPlaylists() {
      const response = await api.get(`/me/playlists?limit=50`);

      setPlaylists(response.data.items);
      setNext(response.data.next);
      setLoad(false);
    }

    loadUser();
    loadPlaylists();
  }, [id]);

  async function loadMore() {
    const endpointURL = next.replace("https://api.spotify.com/v1", "");

    const response = await api.get(endpointURL);

    setPlaylists((oldValue) => [...oldValue, ...response.data.items]);
    setNext(response.data.next);
  }

  return (
    <>
      {load && <h2 className="loading">Carregando...</h2>}
      {!load && (
        <div id="profile" className="container">
          <div className="header">
            <div
              className="user-picture cover"
              style={{
                backgroundImage: `url(${
                  userPicture === 0 ? defaultImage : userPicture
                })`,
              }}
            />
            <h1 className="username">{user.display_name}</h1>
            <h2 className="email">{user.email}</h2>
            <h4 className="followers">Followers: {user.followers.total}</h4>
          </div>
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
