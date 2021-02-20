import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import  ProfilesList from './ProfilesList'
import  ProfileCreateUpdate  from './ProfileCreateUpdate'
import Login from './Screens/Login'
import './App.css';

const BaseLayout = () => (
  <div className="container-fluid">  

      <div className="content">
        <Route path="/login" exact component={Login} />
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