import React, { Component } from "react";
import { Link } from "react-router-dom";

class ListMovie extends Component {
  //State of a ListMovie
  state = {
    Data: [],
    query: "",
    queryChange: false,
    queryEmpty: true,
    id: "",
    Message: "Latest Movies of day"
  };
  componentDidMount() {
    this.initialRendering();//For initial rendering when query is not set
  }
  //Function for handling Query Change
  searchQueryHandler = query => {
    this.setState({ queryEmpty: false });//queryEmpty to false 

    if (query === "") {
      this.setState({ queryEmpty: true });
      this.initialRendering();
    } else {
      const url =
        "https://api.themoviedb.org/3/search/movie?api_key=838a06929ae8dc444ce5d6ca19fbbef6&query=" +
        query;//fetching the response against the query
      fetch(url)
        .then(response => response.json())
        .then(a => {
          this.setState({ Data: a.results, Message: "" });
        })
        .catch(error => alert('Error:', error));//Alerting if some Error
    }
  };
  initialRendering = () => {// function for initial rendering 
    const url =
      "https://api.themoviedb.org/3/trending/movie/day?api_key=838a06929ae8dc444ce5d6ca19fbbef6";
    fetch(url)//fetch details of latest moives
      .then(response => response.json())
      .then(a => {
        this.setState({ Data: a.results, Message: "Latest Movies of Day" });
      })
      .catch(error => alert('Error:', error));//Alerting if some Error;
  };
  checkerComponent = () => {//checking or rendering correct component or display correct data
    
    if (this.state.Data.length === 0) {
      return (
        <div className=" ">
          <h3>Your Search has No Result Please try with different Keyword</h3>
        </div>
      );
    }
    if (this.state.queryEmpty) {//Showing latest movies when query is empty
      return this.state.Data.map(movie => (
        <div key={movie.id} className="col-md-3 card mx-4 my-2 p-4">
          <div className="card">
            <img
              className="card-img-top"
              src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
              alt=""
              height="200"
            />
            <div className="card-body">
              <h5 className="card-title text-dark">{movie.original_title}</h5>
            </div>
          </div>
          <Link className="btn btn-success" to={"/info" + movie.id}>
            ViewDetails
          </Link>
        </div>
      ));
    }
  };
  createDropDown = () => {//for showing search result in form of dropdown
    if (this.state.queryEmpty === false) {
      return this.state.Data.map(movie => (
        <Link className="" to={"/info" + movie.id}>
          <div key={movie.id} className="bg-white border border-primary">
            <div className="card-title text-dark">
              <p className="big">
                <img
                  className="m-3"
                  src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
                  alt=""
                  height="50"
                  width="50"
                />
                <b>{movie.original_title} </b> rating:{movie.popularity}
              </p>
            </div>
          </div>
        </Link>
      ));
    }
  };

  render() {
    return (
      <div className="container mx-auto">
        <div className="dropDown mx-auto jumbotron bg-black   ">
          <input
            style={{
              fontSize: 24,
              outline: "none",
              width: "100%"
            }}
            className="input"
            onChange={event => this.searchQueryHandler(event.target.value)}
            placeholder="Search the Movie Name"
          />

          {this.createDropDown()}
        </div>
        <h1 className="text-white">{this.state.Message}</h1>
        <div className="row mx-2 ">{this.checkerComponent()}</div>
      </div>
    );
  }
}

export default ListMovie;
