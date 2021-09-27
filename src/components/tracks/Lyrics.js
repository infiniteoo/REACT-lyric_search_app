import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  componentDidMount() {
    axios
      /* this needs updating in tutorial */
      .get(
        `https://nameless-tundra-23437.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?commontrack_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MUSIXMATCH_API}`
      )
      .then((res) => {
        this.setState({ lyrics: res.data.message.body.lyrics });
        /* this needs updating in tutorial */
        return axios.get(
          `https://nameless-tundra-23437.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MUSIXMATCH_API}`
        );
      })
      .then((res) => {
        console.log(res.data.message.body.track);
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
      return (
        <>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} by{" "}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              {/*  this needs updating in tutorial  */}
              <strong>Genre</strong>:
              {track.primary_genres.music_genre_list.length !== 0
                ? `${track.primary_genres.music_genre_list[0].music_genre.music_genre_name}`
                : " Not Available"}
            </li>
            <li className="list-group-item">
              {" "}
              <strong>Explicit Lyrics</strong>:
              {track.explicit === 0 ? " No" : " Yes"}
            </li>
          </ul>
        </>
      );
    }
  }
}

export default Lyrics;
