import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import  ClientsList from './ClientsList'
import  ClientCreateUpdate  from './ClientCreateUpdate'
import './App.css';

const BaseLayout = () => (
  <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="navbar-brand">Django React Demo</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="/">CLIENT</a>
            <a className="nav-item nav-link" href="/client">CREER CLIENT</a>
          </div>
        </div>
      </nav>  

      <div className="content">
        <Route path="/" exact component={ClientsList} />
        <Route path="/client/:pk" component={ClientCreateUpdate} />
        <Route path="/client/" exact component={ClientCreateUpdate} />
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