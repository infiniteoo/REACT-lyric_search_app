import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    trackTitle: "",
  };
  render() {
    return (
      <Consumer>
        {(value) => {
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any track</p>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
