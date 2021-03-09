import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router";

import ProfileCreateUpdate  from './API/ProfileCreateUpdate'
import PrivateRoute from './Tracking/PrivateRoute';
import { AuthContext, useAuth } from "./Tracking/Auth";
import useToken from './Tracking/UseToken';
import Login from './Screens/Public/Login';
import Register from './Screens/Public/Register';
import Home from './Screens/Public/Home';
import ProfileHome from './Screens/Private/ProfileHome';
import CreationSuivi from './Screens/Private/CreationSuivi';
import Dashboard from './Screens/Private/Dashboard';
import ParametresSuivi from "./Screens/Private/ParametresSuivi";
import Reglages from './Screens/Private/Reglages'
import './App.css';


// Nav Bar 
const Header = props => {
  const { location } = props;
  const { token } = useAuth();
  var displayNavPublic = false;
  var displayNavPrivate = true;
  if (token) {
    displayNavPublic = true;
    displayNavPrivate = false;
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand >Fastocks</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav activeKey={location.pathname} className="mr-auto">
          <Nav.Link href="/" hidden={displayNavPublic}>Accueil</Nav.Link>
          <Nav.Link href="/login" hidden={displayNavPublic}>Se connecter</Nav.Link>
          <Nav.Link href="/register" hidden={displayNavPublic}>S'inscrire</Nav.Link>
          <Nav.Link href="/myaccount" hidden={displayNavPrivate}>Accueil</Nav.Link>
          <Nav.Link href="/myaccount/settings" hidden={displayNavPrivate}>Réglages</Nav.Link>
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
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path='/register' component={Register}/>
      <Route path="/profile/:pk" component={ProfileCreateUpdate} />
      <Route exact path="/profile/" component={ProfileCreateUpdate} />
      <PrivateRoute exact path="/myaccount" component={ProfileHome} />
      <PrivateRoute path="/myaccount/settings" component={Reglages} />
      <PrivateRoute path="/myaccount/settings/change-password" component={Reglages} />
      <PrivateRoute path="/myaccount/new-monitoring " component={CreationSuivi} />
      <PrivateRoute path="/myaccount/monitor" component={Dashboard} />
      <PrivateRoute path="/myaccount/monitor/:id" component={Dashboard} />
      <PrivateRoute path="/myaccount/monitor/:id/settings" component={ParametresSuivi} />
  </div>
)

// App
function App() {
  const {setLocalToken, setSessionToken, token } = useToken();
  return (
    <AuthContext.Provider value={{setLocalToken, setSessionToken, token }}>
      <Router>
        <BaseLayout/>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;