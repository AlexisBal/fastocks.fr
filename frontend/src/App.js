import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router";

import ProfileCreateUpdate  from './ProfileCreateUpdate'
import PrivateRoute from './PrivateRoute';
import { ProvideAuth } from "./Auth";
import Login from './Screens/Login';
import Home from './Screens/Home';
import ProfileHome from './Screens/ProfileHome';
import './App.css';


// Nav Bar 
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

// Router
const BaseLayout = () => (
  <div className="container-fluid">  
      <HeaderWithRouter />

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/profile/:pk" component={ProfileCreateUpdate} />
        <Route path="/profile/" exact component={ProfileCreateUpdate} />
        <PrivateRoute path="/myaccount" exact component={ProfileHome} />
      </Switch>
  </div>
)

class App extends Component {
  render() {
    return (
      <ProvideAuth>
        <Router>
          <BaseLayout/>
        </Router>
      </ProvideAuth>
    );
  }
}

export default App;