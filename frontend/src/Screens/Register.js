import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import DatePicker, { registerLocale } from  "react-datepicker";
import fr from 'date-fns/locale/fr';

import ProfilesService from  '../API/ProfilesService'
import { useAuth } from "../Tracking/Auth";

import "react-datepicker/dist/react-datepicker.css";

// Connexion à l'API
const profilesService = new ProfilesService();

// Réglage de la langue du calendrier
registerLocale('fr', fr)

function Register() {
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePwd, setErrorMessagePwd] = useState("");
    const { setToken, token} = useAuth();

    if (token) {
      return <Redirect to={"/myaccount"} />;
    }

    const handleSubmit = async e => {
      e.preventDefault();
      if (email != emailConfirm) {
        let err = <strong className="error">Les adresses email saisies sont différentes !</strong>;
        setErrorMessageEmail(err);
        setError(true);
      }
  
    }

    if (isLoggedIn) {
      return <Redirect to={"/myaccount"} />;
    }

    return (
      <body className="text-center">
        <main className="form-register">
          <form onSubmit={handleSubmit} >
              <h1 className="h3 mb-3 fw-normal">Création de votre compte Fastocks</h1>
              <div className="gender" autoFocus onChange={e => setGender(e.target.value)}>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value='F' required></input>
                    <label className="form-check-label" for="inlineRadio1">Madame</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value='M' required></input>
                    <label className="form-check-label" for="inlineRadio2">Monsieur</label>
                </div>
              </div>
              <DatePicker 
               required
               popperPlacement="auto"
               wrapperClassName="datePicker" 
               className="form-control" 
               id="birthdate" 
               placeholderText='Date de naissance (JJ/MM/AAAA)' 
               locale="fr" 
               dateFormat={"dd/MM/yyyy"}  
               selected={birthDate} 
               onChange={date => setBirthDate(date)}/>
              <input type="text" id="lastname" className="form-control" placeholder="Nom de famille" required onChange={e => setLastName(e.target.value)}></input>
              <input type="text" id="firstname" className="form-control" placeholder="Prénom" required onChange={e => setFirstName(e.target.value)}></input>
              <input type="email" id="email" className="form-control" placeholder="Adresse email" required  onChange={e => setEmail(e.target.value)}></input>
              <input type="email" id="email-confirm" className="form-control" placeholder="Confirmation de l'adresse email" required onChange={e => setEmailConfirm(e.target.value)}></input>
              {errorMessageEmail}
              <input type="password" id="password" className="form-control" placeholder="Mot de passe" required onChange={e => setPassword(e.target.value)}></input>
              <input type="password" id="password-confirm" className="form-control" placeholder="Confirmation du mot de passe" required onChange={e => setPasswordConfirm(e.target.value)}></input>
              <button className="w-100 btn btn-lg btn-primary" type="submit" value="submit">Inscription</button>
          </form>
      </main>
    </body>
    );
}  

export default Register;