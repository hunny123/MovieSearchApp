import React, { Component } from "react";
import { Link } from "react-router-dom";
class MovieInfo extends Component {
  state = {//state for movieInfo component
    movieData: [],
    id: this.props.match.params.id
  };

  async componentDidMount() {//async call for getting data
    const url =
      "https://api.themoviedb.org/3/movie/" +
      this.state.id +
      "?api_key=838a06929ae8dc444ce5d6ca19fbbef6";
    await fetch(url)
      .then(response => response.json())
      .then(a => {
        this.setState({ movieData: a });
      });
  }
  render() {
    return (
      <div className="container">
        <Link className="btn float-right btn-danger" to={"/"}>
          X
        </Link>
        <div className="jumbotron mx-5 bg-transparent">
          <div className="row ">
            <div key={this.state.id} className="col-md-5 ">
              <img
                src={
                  "https://image.tmdb.org/t/p/w500/" +
                  this.state.movieData.poster_path
                }
                alt=""
                height="400"
                width="300"
              />
            </div>
            <div className="col-md-5 card  text-dark">
              <h3 className="">
                {" "}
                Movie Title : {this.state.movieData.original_title}
              </h3>
              <h3 className="">Description:</h3>
              <p>{this.state.movieData.overview}</p>
              <p>
                {" "}
                <b>Rating</b>: {this.state.movieData.popularity}
              </p>
              <p>
                <b>Release Date:</b>
                {this.state.movieData.release_date}
              </p>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}
export default MovieInfo;
