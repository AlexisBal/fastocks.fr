import React from 'react';

import { useAuth } from "../../Tracking/Auth";

function ProfileHome () {
  const { setLocalToken, setSessionToken, setSessionInformations, setLocalInformations } = useAuth();

  function logOut() {
    setSessionToken(false);
    setLocalToken(false);
    setSessionInformations({
      id: false,
      first_name: false,
      phone: false,
      alert_stock: false,
      alert_price: false,
      alert_sms: false,
      alert_email: false
    });

    setLocalInformations({
      id: false,
      first_name: false,
      phone: false,
      alert_stock: false,
      alert_price: false,
      alert_sms: false,
      alert_email: false
    })
  }

  return (
    <body>
      <div className='safe-container'>
        <h1>Accueil</h1>
        <main className="form-settings">
           <button className="w-100 btn btn-lg btn-primary" onClick={logOut}>Log out</button>
        </main>
      </div>
    </body>
  );
}

export default ProfileHome;