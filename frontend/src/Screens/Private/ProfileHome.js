import { useAuth } from "../../Tracking/Auth";
import React from 'react';

function ProfileHome () {
  const { setLocalToken, setSessionToken } = useAuth();

  function logOut() {
    setSessionToken(false);
    setLocalToken(false);
  }

  return (
    <div>
      <div>Admin Page</div>
      <button className="w-100 btn btn-lg btn-primary" onClick={logOut}>Log out</button>
    </div>
  );
}

export default ProfileHome;