import React, { Component } from "react";
import axios from "axios";
import Spinner from "../layout/Spinner";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  componentDidMount() {
    axios
      .get(
        `https://nameless-tundra-23437.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MUSIXMATCH_API}`
      )
      .then((res) => {
        console.log("lyrics call", res.data);
        console.log(this.props.match.params.id);
        this.setState({ lyrics: res.data.message.body.lyrics });

        return axios.get(
          `https://nameless-tundra-23437.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MUSIXMATCH_API}`
        );
      })
      .then((res) => {
        this.setState({ track: res.data.message.body.track });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { track, lyrics } = this.state;

    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return <h1>Data returned</h1>;
    }
  }
}

export default Lyrics;
