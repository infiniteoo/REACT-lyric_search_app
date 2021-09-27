import React, { Component } from "react";
import axios from "axios";

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
        console.log(res.data.message.body);
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div>
        <h1>Lyrics</h1>
      </div>
    );
  }
}

export default Lyrics;
