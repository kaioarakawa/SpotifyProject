import React from "react";
import TrackList from "../TrackList/index";
import "./styles.css";

class SearchResults extends React.Component {
  render() {
    return (
      <div className="searchResults">
        <h2>Results</h2>
        <TrackList
          tracks={this.props.searchResults}
          onAdd={this.props.onAdd}
          isRemoval={false}
        />
      </div>
    );
  }
}

export default SearchResults;
