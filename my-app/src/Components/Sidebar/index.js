import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome, MdPerson, MdQueue } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Logo from "../../Assets/Spotify_Logo_RGB_White.png";
import "./styles.css";

function Sidebar({ sidebarState }) {
  const menuItems = [
    {
      label: "Início",
      path: "/",
      icon: <MdHome size="2rem" />,
    },
    {
      label: "Buscar",
      path: "/search",
      icon: <FiSearch size="2rem" />,
    },
    {
      label: "Perfil",
      path: "/profile",
      icon: <MdPerson size="2rem" />,
    },
  ];

  const playlistItens = [
    {
      label: "Criar Playlist",
      path: "/createPlaylist",
      icon: <MdQueue size="2rem" />,
    },
  ];

  return (
    <div id="sidebar">
      <img src={Logo} alt="logo" />
      <ul>
        {menuItems.map((data) => (
          <li
            key={data.path}
            className="menu-item"
            onClick={window.innerWidth <= 810 ? sidebarState : null}
          >
            <NavLink exact className="item-link" to={data.path}>
              <div className="item-icon">{data.icon}</div>
              <div className="item-text">{data.label}</div>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="user-playlists">
        <span>Playlist</span>
        <ul>
          {playlistItens.map((data) => (
            <li
              key={data.path}
              className="menu-item"
              onClick={window.innerWidth <= 810 ? sidebarState : null}
            >
              <NavLink exact className="item-link" to={data.path}>
                <div className="item-icon">{data.icon}</div>
                <div className="item-text">{data.label}</div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
