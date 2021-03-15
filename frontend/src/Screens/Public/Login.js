import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import {Alert} from 'react-bootstrap';

import ProfilesService from  '../../API/ProfilesService'
import { useAuth } from "../../Tracking/Auth";


const profilesService = new ProfilesService();

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [show, setShow] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { setLocalToken, setSessionToken, token, setLocalInformations, setSessionInformations } = useAuth();

    function AlertDismissibleExample() {
      if (show) {
        return (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Oups, il semble qu'il y ait un problème !</Alert.Heading>
            <p>
              Veuillez vérifier vos identifiants.
            </p>
          </Alert>
        );
      }
      else {
        return(null)
      }
    }

    if (token) {
      return <Redirect to={"/myaccount"} />;
    }

    const handleSubmit = async e => {
      e.preventDefault();
      profilesService.login({
        "email": email,
        "password": password
      }).then((result)=>{
        if (rememberMe) {
          setLocalToken({token: result.data.token});
          setSessionToken({token: result.data.token});
          setLocalInformations({
            id: {id: result.data.id_user},
            first_name: {first_name: result.data.first_name},
            phone: {phone: result.data.phone},
            alert_stock: {alert_stock: result.data.alert_stock},
            alert_price: {alert_price: result.data.alert_price},
            alert_sms: {alert_sms: result.data.alert_sms},
            alert_email: {alert_email: result.data.alert_email}
          })
          setSessionInformations({
            id: {id: result.data.id_user},
            first_name: {first_name: result.data.first_name},
            phone: {phone: result.data.phone},
            alert_stock: {alert_stock: result.data.alert_stock},
            alert_price: {alert_price: result.data.alert_price},
            alert_sms: {alert_sms: result.data.alert_sms},
            alert_email: {alert_email: result.data.alert_email}
          })
        }
        else {
          setSessionToken({token: result.data.token});
          setSessionInformations({
            id: {id: result.data.id_user},
            first_name: {first_name: result.data.first_name},
            phone: {phone: result.data.phone},
            alert_stock: {alert_stock: result.data.alert_stock},
            alert_price: {alert_price: result.data.alert_price},
            alert_sms: {alert_sms: result.data.alert_sms},
            alert_email: {alert_email: result.data.alert_email}
          })
        }
        setLoggedIn(true);
      }).catch(()=>{ 
        setShow(true)
      });
    }

    if (isLoggedIn) {
      return <Redirect to={"/myaccount"} />;
    }

    return (
      <body>
        <div className='safe-container'>
          <AlertDismissibleExample className="alert"/>
          <main className="form-signin text-center">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Merci de vous connecter</h1>
                <input type="email" id="email" className="form-control" placeholder="Adresse email" required autoFocus onChange={e => setEmail(e.target.value)}></input>
                <input type="password" id="password" className="form-control" placeholder="Mot de passe" required onChange={e => setPassword(e.target.value)}></input>
                <div className="checkbox mb-3" >
                      <input className="form-check-input" type="checkbox"  id="flexCheckDefault" onChange={e => setRememberMe(e.target.value)}></input>
                      <label className="form-check-label" for="flexCheckDefault">Rester connecté</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary submit" type="submit" value="submit">Connexion</button>
            </form>
          </main>
        </div>
    </body>
    );
}  

export default Login;