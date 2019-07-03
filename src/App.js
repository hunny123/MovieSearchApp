import React, { Component } from "react";
import {Route} from 'react-router-dom';
import Particles from "react-particles-js";
import "./App.css";
import ListMovie from "./ListMovie";
import MovieInfo from "./MovieInfo";
const particlesOptions = {//option for Particlejs
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
      }
    }
  }
};
class App extends Component {
    
    render(){
        return (
           <div className="background ">
            <Particles className="particles" params={particlesOptions} />
            <div className="bg-opaque jumbotron text-white">
            <h1>Movies search app</h1></div>
            <div className="container">
            <Route exact path="/" render={() => (<ListMovie />)}/>
            <Route exact path="/info:id" component={MovieInfo}/>
          </div></div>
        )
    }
}
export default App;