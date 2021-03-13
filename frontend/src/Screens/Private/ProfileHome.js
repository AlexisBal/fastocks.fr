import { useAuth } from "../../Tracking/Auth";
import React from 'react';

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
      <div>Admin Page</div>
      <button className="w-100 btn btn-lg btn-primary" onClick={logOut}>Log out</button>
    </body>
  );
}

export default ProfileHome;