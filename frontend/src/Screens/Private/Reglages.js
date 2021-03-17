import React, {useState} from 'react';
import {Button, Accordion, Card, useAccordionToggle} from 'react-bootstrap';
import {BsFillBellFill} from "react-icons/bs";
import { IconContext } from "react-icons";

import { useAuth } from "../../Tracking/Auth";

function Reglages () {

  const { token, id, phone, email, alertEmail, alertSms, alertPrice, alertStock, setSessionInformations } = useAuth();

  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log('totally custom!'),
    );
    return (
      <Button
        style={{marginTop: "20px"}}
        variant="outline-primary"
        onClick={decoratedOnClick}
      >
       {children}
      </Button>
    );
  }
  
  var buttonStock = "";
  var buttonPrice = "";
  var textStock = "";
  var textPrice = "";

  if(alertPrice) {
    buttonPrice = "outline-success";
    textPrice = "Alerte prix activée";
  }
  else{
    buttonPrice = "outline-danger";
    textPrice = "Alerte prix désactivée";
  }
  if(alertStock) {
    buttonStock = "outline-success";
    textStock = "Alerte stock activée";
  }
  else{
    buttonStock = "outline-danger";
    textStock = "Alerte stock désactivée";
  }

  function UpdateAlertStock() {
    
  }

  return (
    <body id='settings-body'>
      <div className='safe-container'>
        <h1>Mes préférences</h1>
        <main className="form-settings text-center">
          <Accordion defaultActiveKey="0" id="alert-mail">
            <Card>
              <Card.Header id="alert-mail">
                <IconContext.Provider value={{ color: "white", className: "alert-mail-logo" }}>
                  <div>
                    <BsFillBellFill />
                  </div>
                </IconContext.Provider>
                <h2>Mes alertes par mail</h2> 
                <div> 
                  <text>Vous recevez les alertes Fastocks sur <strong>{email}</strong></text>    
                </div>
                <CustomToggle eventKey="1">Gérer mes alertes</CustomToggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <h3>Cliquer pour activer ou desactiver une alerte</h3>
                  <Button  style={{margin: "20px"}} variant={buttonStock}>{textStock}</Button>
                  <Button style={{margin: "20px"}} variant={buttonPrice}>{textPrice}</Button>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <div id="alert-phone">
            <h2>Mes alertes par téléphone</h2>            
          </div>
        </main>
      </div>
    </body>
  );
}

export default Reglages;