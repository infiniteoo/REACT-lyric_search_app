import axios from "axios";
import React, { Component } from "react";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    track_list: [],
    heading: "Top 10 Tracks",
  };

  componentDidMount() {
    axios
      .get(
        `https://nameless-tundra-23437.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=US&f_has_lyrics=1&apikey=${process.env.REACT_APP_MUSIXMATCH_API}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
