import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlay, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { MdMusicNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import * as Player from "../../Store/Modules/Player/actions";
import Swal from "sweetalert2";
import Button from "../../Components/Button";
import api from "../../Services/api";
import "./styles.css";
import defaultImage from "../../Assets/default-image.jpg";

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [save, setSave] = useState("");

  const [load, setLoad] = useState(true);

  const id = useParams().playlistId;

  const dispatch = useDispatch();

  const trackData = useSelector((state) => state.player.data);

  useEffect(() => {
    async function loadPlaylist() {
      const response = await api.get(
        `/playlists/${id}?market=br&fields=images%2Chref%2Cname%2Cowner(!href%2Cexternal_urls)%2Ctracks.items(added_by.id%2Ctrack(artists%2Cduration_ms%2Cid%2Cname%2Chref%2Cpreview_url%2Calbum(images%2Cname%2Chref%2Cid)))`
      );

      setPlaylist(response.data);

      setLoad(false);
    }

    async function verifySaved() {
      const response = await api.get(
        `/playlists/${id}/followers/contains?ids=${localStorage.getItem(
          "userId"
        )}`
      );

      setSave(response.data[0]);
    }

    verifySaved();
    loadPlaylist();
  }, [id]);

  function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  async function savePlaylist() {
    try {
      await api.put(`/playlists/${id}/followers`);

      setSave(true);
      Swal.fire({
        title: "Playlist saved",
        confirmButtonText: "Ok!!",
      });
    } catch (error) {
      Swal.error({
        title: "Ocorreu um erro ao salvar a playlist",
        confirmButtonText: "Ok!!",
      });
    }
  }

  async function removePlaylist() {
    try {
      await api.delete(`/playlists/${id}/followers`);

      setSave(false);
      Swal.fire({
        title: "Playlist removed",
        confirmButtonText: "Ok!!",
      });
    } catch (error) {
      Swal.error({
        title: "Ocorreu um erro ao remover a playlist da sua biblioteca",
        confirmButtonText: "Ok!!",
      });
    }
  }

  return (
    <>
      {load ? (
        <h2 className="loading">Carregando...</h2>
      ) : (
        <div id="album" className="container">
          <div className="album-info">
            <div
              className="album-image cover"
              style={{
                backgroundImage: `url(${
                  playlist.images.length > 0
                    ? playlist.images[0].url
                    : defaultImage
                })`,
              }}
            />
            <h2 className="album-title">{playlist.name}</h2>
            <Button id={id} type="playlist" />
            <div className="album-options">
              {!save && <FaRegHeart onClick={savePlaylist} size="1.8em" />}
              {save && (
                <FaHeart
                  onClick={removePlaylist}
                  size="1.8em"
                  color="#1DB954"
                />
              )}
              <FaShareAlt size="1.8em" />
            </div>
            <div className="album-year">
              <span>{playlist.tracks.length} músicas</span>
            </div>
          </div>
          <div className="album-tracks tracks">
            {playlist.tracks.items.map((data) => (
              <div
                key={data.track.name}
                className={`track ${
                  trackData.length !== 0 && trackData.name === data.track.name
                    ? "track-active"
                    : ""
                }`}
              >
                <div className="note-icon">
                  <MdMusicNote size="1em" />
                </div>
                {console.log(data.track)}
                <div
                  className="play-icon"
                  onClick={() => dispatch(Player.playTrack(data.track))}
                >
                  <FaPlay size="1em" />
                </div>
                <div className="track-info">
                  <span className="track-name">{data.track.name}</span>
                  <div className="track-artists">
                    {data.track.artists.map((artist) => (
                      <Link to={`/artist/id=${artist.id}`} key={artist.id}>
                        <span>{artist.name}</span>
                      </Link>
                    ))}
                    <Link to={`/album/id=${data.track.album.id}`}>
                      <span className="track-album">
                        {data.track.album.name}
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="track-duration">
                  <span>
                    {millisToMinutesAndSeconds(data.track.duration_ms)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Playlist;
