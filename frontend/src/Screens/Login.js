import React, { useState } from 'react';
import { Redirect } from "react-router-dom";

import ProfilesService from  '../ProfilesService'
import { useAuth } from "../Auth";


const profilesService = new ProfilesService();

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const { setToken, token} = useAuth();

    if (token) {
      return <Redirect to={"/myaccount"} />;
    }

    const handleSubmit = async e => {
      e.preventDefault();
      profilesService.login({
        "email": email,
        "password": password
      }).then((result)=>{
        setToken({token: result.data.token});
        setLoggedIn(true);
      }).catch(()=>{
        alert('There was an error! Please re-check your form.');
      });
    }

    if (isLoggedIn) {
      return <Redirect to={"/myaccount"} />;
    }

    return (
      <body className="text-center">
        <main className="form-signin">
          <form onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 fw-normal">Merci de vous connecter</h1>
              <input type="email" id="email" className="form-control" placeholder="Adresse email" required autoFocus onChange={e => setEmail(e.target.value)}></input>
              <input type="password" id="password" className="form-control" placeholder="Mot de passe" required onChange={e => setPassword(e.target.value)}></input>
              <div className="checkbox mb-3">
                  <label>
                    <input type="checkbox"></input>
                    {'\n'} Rester connecté 
                  </label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit" value="submit">Connexion</button>
              <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
          </form>
      </main>
    </body>
    );
}  

export default Login;