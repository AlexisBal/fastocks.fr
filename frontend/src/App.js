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
import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home';
import ProfileHome from './Screens/ProfileHome';
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
          <Nav.Link href="/myaccount" hidden={displayNavPrivate}>Accueil</Nav.Link>
          <Nav.Link href="/login" hidden={displayNavPublic}>Se connecter</Nav.Link>
          <Nav.Link href="/register" hidden={displayNavPublic}>S'inscrire</Nav.Link>
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
      <Route path="/login" component={Login} />
      <Route path='/register' component={Register}/>
      <Route path="/profile/:pk" component={ProfileCreateUpdate} />
      <Route path="/profile/" component={ProfileCreateUpdate} />
      <PrivateRoute path="/myaccount" component={ProfileHome} />
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