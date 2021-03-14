import React, {useState} from 'react';
import {Button} from 'react-bootstrap';

import { useAuth } from "../../Tracking/Auth";

function Reglages () {

  const { token, id, phone, alertEmail, alertSms, alertPrice, alertStock, setSessionInformations } = useAuth();

  return (
    <body id='settings-body'>
      <div className='safe-container'>
        <h1>Réglages</h1>
        <main className="form-settings">
          <form className="text-center">
            <Button variant="outline-primary">Modifier le mot de passe</Button>
          </form>
        </main>
      </div>
    </body>
  );
}

export default Reglages;