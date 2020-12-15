import React from 'react';
import { FaSpotify } from 'react-icons/fa';
import './styles.css';

function Button({ type, id }) {
    return (
        <div className="spotify-link">
            <a
                href={`https://open.spotify.com/${type}/${id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FaSpotify size="1.5em" />
                Spotify
            </a>
        </div>
    );
}

export default Button;
