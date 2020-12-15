import React from "react";
import "./styles.css";

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return (
        <button className="track_action" onClick={this.removeTrack}>
          -
        </button>
      );
    } else {
      return (
        <button className="track_action" onClick={this.addTrack}>
          +
        </button>
      );
    }
  }

  addTrack(event) {
    this.props.onAdd(this.props.track);
  }

  removeTrack(event) {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="track">
        <img alt="Music" src={this.props.track.album.images[0].url}></img>
        <div className="track_information">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artists[0].name} | {this.props.track.album.name}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
