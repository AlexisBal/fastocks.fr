import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import  ProfilesList from './ProfilesList'
import  ProfileCreateUpdate  from './ProfileCreateUpdate'
import './App.css';

const BaseLayout = () => (
  <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">Django React Demo</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/">PROFILE</a>
            <a className="nav-item nav-link" href="/profile">CREER UN PROFILE</a>
          </div>
        </div>
      </nav>  

      <div className="content">
        <Route path="/" exact component={ProfilesList} />
        <Route path="/profile/:pk" component={ProfileCreateUpdate} />
        <Route path="/profile/" exact component={ProfileCreateUpdate} />
      </div>

  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>
    );
  }
}

export default App;