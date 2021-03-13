import { useState } from 'react';

export default function Informations() {
  const getInformations = () => {
    var idString = sessionStorage.getItem('id');
    var firstNameString = sessionStorage.getItem('first_name');
    var phoneString = sessionStorage.getItem('phone');
    var alertStockString = sessionStorage.getItem('alert_stock');
    var alertPriceString = sessionStorage.getItem('alert_price');
    var alertSmsString = sessionStorage.getItem('alert_sms');
    var alertEmailString = sessionStorage.getItem('alert_email');
    if (!idString) {
      idString = localStorage.getItem('id');
      firstNameString = sessionStorage.getItem('first_name');
      phoneString = sessionStorage.getItem('phone');
      alertStockString = sessionStorage.getItem('alert_stock');
      alertPriceString = sessionStorage.getItem('alert_price');
      alertSmsString = sessionStorage.getItem('alert_sms');
      alertEmailString = sessionStorage.getItem('alert_email');
    }
    const userId = JSON.parse(idString);
    const userFirstName = JSON.parse(firstNameString);
    const userPhone = JSON.parse(phoneString);
    const userAlertStock = JSON.parse(alertStockString);
    const userAlertPrice = JSON.parse(alertPriceString);
    const userAlertSms = JSON.parse(alertSmsString);
    const userAlertEmail = JSON.parse(alertEmailString);
    return [
      userId?.id, 
      userFirstName?.first_name,
      userPhone?.phone,
      userAlertStock?.alert_stock,
      userAlertPrice?.alert_price,
      userAlertSms?.alert_sms,
      userAlertEmail?.alert_email
    ]
  };

  const [id, setId] = useState(getInformations()[0]);
  const [firstName, setFirstName] = useState(getInformations()[1]);
  const [phone, setPhone] = useState(getInformations()[2]);
  const [alertStock, setAlertStock] = useState(getInformations()[3]);
  const [alertPrice, setAlertPrice] = useState(getInformations()[4]);
  const [alertSms, setAlertSms] = useState(getInformations()[5]);
  const [alertEmail, setAlertEmail] = useState(getInformations()[6]);

  const saveLocalInformations = userInformations => {
    localStorage.setItem('id', JSON.stringify(userInformations.id));
    localStorage.setItem('first_name', JSON.stringify(userInformations.first_name));
    localStorage.setItem('phone', JSON.stringify(userInformations.phone));
    localStorage.setItem('alert_stock', JSON.stringify(userInformations.alert_stock));
    localStorage.setItem('alert_price', JSON.stringify(userInformations.alert_price));
    localStorage.setItem('alert_sms', JSON.stringify(userInformations.alert_sms));
    localStorage.setItem('alert_email', JSON.stringify(userInformations.alert_email));
    setId(userInformations.id.id);
    setFirstName(userInformations.first_name.first_name);
    setPhone(userInformations.phone.phone);
    setAlertStock(userInformations.alert_stock.alert_stock);
    setAlertPrice(userInformations.alert_price.alert_price);
    setAlertSms(userInformations.alert_sms.alert_sms);
    setAlertEmail(userInformations.alert_email.alert_email);
  };

  const saveSessionInformations = userInformations => {
    sessionStorage.setItem('id', JSON.stringify(userInformations.id));
    sessionStorage.setItem('first_name', JSON.stringify(userInformations.first_name));
    sessionStorage.setItem('phone', JSON.stringify(userInformations.phone));
    sessionStorage.setItem('alert_stock', JSON.stringify(userInformations.alert_stock));
    sessionStorage.setItem('alert_price', JSON.stringify(userInformations.alert_price));
    sessionStorage.setItem('alert_sms', JSON.stringify(userInformations.alert_sms));
    sessionStorage.setItem('alert_email', JSON.stringify(userInformations.alert_email));
    setId(userInformations.id.id);
    setFirstName(userInformations.first_name.first_name);
    setPhone(userInformations.phone.phone);
    setAlertStock(userInformations.alert_stock.alert_stock);
    setAlertPrice(userInformations.alert_price.alert_price);
    setAlertSms(userInformations.alert_sms.alert_sms);
    setAlertEmail(userInformations.alert_email.alert_email);
  };

  return {
    setLocalInformations: saveLocalInformations,
    setSessionInformations: saveSessionInformations,
    id,
    firstName,
    phone,
    alertStock,
    alertPrice,
    alertSms,
    alertEmail
  }
}