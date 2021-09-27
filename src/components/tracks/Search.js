import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    trackTitle: "",
  };

  onChange = (e) => {
    this.setState({ trackTitle: e.target.value });
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
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Song title..."
                    className="form-control form-control lg"
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
