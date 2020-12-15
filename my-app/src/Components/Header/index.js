import React, { useState, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import api from "../../Services/api";
import defaultUser from "../../Assets/default-user.png";
import "./styles.css";

function Header({ sidebarState }) {
  const [user, setUser] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

  const history = useHistory();

  async function loadUser() {
    const response = await api.get("/me");

    setUser(response.data);
    localStorage.setItem("user", response.data.display_name);
    localStorage.setItem("userId", response.data.id);
  }

  useEffect(() => {
    loadUser();
  }, []);

  function logout() {
    localStorage.removeItem("user");
    history.push("/login");
  }

  const dropdownMenu = useCallback(
    () => setShowDropdown((value) => !value),
    []
  );

  return (
    <div id="header">
      <div className="sidebar-toggle" onClick={sidebarState}>
        <GiHamburgerMenu />
      </div>
      <div
        className="user-menu"
        onClick={dropdownMenu}
        onBlur={() => setShowDropdown(false)}
      >
        <div className="profileHeader">
          <img
            className="main-profile-img"
            src={user !== "" ? user.images[0].url : defaultUser}
            alt="profileImage"
          />
          <span className="user">{user.display_name}</span>
        </div>
        <div
          className="user-content"
          style={showDropdown ? { display: "block" } : { display: "none" }}
        >
          <ul>
            <li>
              <Link to="/profile">Perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
