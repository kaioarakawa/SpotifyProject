import React from "react";
import Logo from "../../Assets/Spotify_Logo_RGB_White.png";
import "./styles.css";

function Login() {
  return (
    <div id="login">
      <div className="header">
        <div className="spotify-logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
      <div className="content">
        <a
          href={
            process.env.REACT_APP_AUTH_API_URL || "http://localhost:8888/login"
          }
          rel="nooper noreferrer"
        >
          <button type="button">Fazer login no Spotify</button>
        </a>
        <div className="login-info">
          Ao clicar no botão acima você será redirecionado para a página de
          Login do Spotify
        </div>
        <div className="login-info">
          Esse aplicativo foi criado utilizando ReactJS e a api do Spotify
        </div>
      </div>
    </div>
  );
}

export default Login;
