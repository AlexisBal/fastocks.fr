import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router";

import  ProfileCreateUpdate  from './ProfileCreateUpdate'
import Login from './Screens/Login'
import Home from './Screens/Home'
import './App.css';

const Header = props => {
  const { location } = props;
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand >Fastocks</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav activeKey={location.pathname} className="mr-auto">
          <Nav.Link href="/">Accueil</Nav.Link>
          <Nav.Link href="/login">Se connecter</Nav.Link>
          <Nav.Link href="#">S'inscrire</Nav.Link>
      </Nav>
      </Navbar.Collapse>
  </Navbar>
  );
};

const HeaderWithRouter = withRouter(Header);

const BaseLayout = () => (
  <div className="container-fluid">  
      <HeaderWithRouter />

      <div className="content">
        <Route path="/" exact component={Home} />
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