import { useAuth } from "../../Tracking/Auth";
import React from 'react';

function ProfileHome () {
  const { setLocalToken, setSessionToken, setSessionId, setLocalId } = useAuth();

  function logOut() {
    setSessionToken(false);
    setLocalToken(false);
    setSessionId(false);
    setLocalId(false);
  }

  return (
    <body>
      <div>Admin Page</div>
      <button className="w-100 btn btn-lg btn-primary" onClick={logOut}>Log out</button>
    </body>
  );
}

export default ProfileHome;