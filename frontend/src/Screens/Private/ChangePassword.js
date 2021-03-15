import React, {useState} from 'react';
import {Button} from 'react-bootstrap';

function ChangePassword () {

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    
  return (
    <body>
      <div className='safe-container'>
        <main className="form-change-password text-center">
          <h1 className="h3 mb-3 fw-normal">Modification du mot de passe</h1>
          <form>
            <input type="password" id="password" className="form-control" placeholder="Mot de passe actuel" required autoFocus onChange={e => setPassword(e.target.value)}></input>
            <input type="password" id="new-password" className="form-control" placeholder="Nouveau mot de passe" required onChange={e => setNewPassword(e.target.value)}></input>
            <input type="password" id="new-password-confirm" className="form-control" placeholder="Confirmation du mot de passe" required onChange={e => setNewPasswordConfirm(e.target.value)}></input>
            <Button variant="outline-primary">Confimer</Button>
          </form>
        </main>
      </div>
    </body>
  );
}

export default ChangePassword;