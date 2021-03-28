import React, {useState} from 'react';
import {Button} from 'react-bootstrap';

import ProfilesService from  '../../API/ProfilesService'

function CreationSuivi () {
  // Connexion à l'API
  const profilesService = new ProfilesService();

  // Etat local
  const [url, setUrl] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [categorie, setCategorie] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [errorUrl, setErrorUrl] = useState("");

  // Stockage navigateur
  const productDictString = sessionStorage.getItem('product');
  const productDict = JSON.parse(productDictString)

  // Validation 1 
  const handleInputUrl = async e => {
    e.preventDefault();
    profilesService.validateUrl({
      'url': url
    }).then((result)=>{
      sessionStorage.setItem('product', JSON.stringify(result.data));
    }).catch(()=>{ 
      let err = <strong className="error">L'url entrée ne correspond pas à un produit traçable. Veuillez vérifier que l'url est valide et que le site marchant est pris en charge par Fastocks.</strong>;
      setErrorUrl(err)
    });
  }

  // Validation 2 
  const handleInputProduct = async e => {
    e.preventDefault();
    profilesService.validateProduct({
      'url': productDict.url, 
      'market_place': productDict.market_place,
      'brand': brand,
      "name": name,
      "categorie": categorie,
      "size": size,
      "color": color
    }).then((result)=>{
      sessionStorage.setItem('product', JSON.stringify(result.data));
    })
  }

  // Affichage de l'étape en cours
  if (productDict) {
    if (productDict.brand === "pass") {
      return (
        <body>
          <div className='safe-container'>
            <h1>Nouveau Suivi</h1>
            <main className="form-new-monitoring"> 
              <h2 className="text-center">Étape 2 / 3 : Caractéristiques du produit</h2> 
              <form onSubmit={handleInputProduct}>
                <div>
                  <input id="brand" className="form-control" placeholder="Entrer la marque du produit" required autoFocus onChange={e => setBrand(e.target.value)}></input>
                  <input id="name" className="form-control" placeholder="Entrer le nom du produit" required autoFocus onChange={e => setName(e.target.value)}></input>
                  <input id="categorie" className="form-control" placeholder="Entrer la catagorie du produit" required autoFocus onChange={e => setCategorie(e.target.value)}></input>
                  <input id="size" className="form-control" placeholder="Entrer la taille du produit" required autoFocus onChange={e => setSize(e.target.value)}></input>
                  <input id="color" className="form-control" placeholder="Entrer la couleur du produit" required autoFocus onChange={e => setColor(e.target.value)}></input>
                </div>
                <div className="text-center">
                  <Button id="button-submit" variant="outline-primary" type="submit" value="submit">Confimer</Button>
                </div>
              </form>
            </main>
          </div>
        </body>
      );
    }
    else {
      return (
        <body>
          <div className='safe-container'>
            <h1>Nouveau Suivi</h1>
            <main className="form-new-monitoring"> 
              <h2 className="text-center">Étape 3 / 3 : Paramètres du suivi</h2> 
              <form onSubmit={handleInputUrl}>
                <div>
                  <input id="url_website" className="form-control" placeholder="Entrer l'url du produit à suivre" required autoFocus onChange={e => [setUrl(e.target.value), setErrorUrl("")]}></input>
                  {errorUrl}
                </div>
                <div className="text-center">
                  <Button id="button-submit" variant="outline-primary" type="submit" value="submit">Confimer</Button>
                </div>
              </form>
            </main>
          </div>
        </body>
      );
    }
  }
  else {
    return (
      <body>
        <div className='safe-container'>
          <h1>Nouveau Suivi</h1>
          <main className="form-new-monitoring"> 
            <h2 className="text-center">Étape 1 / 3 : Validation de l'url</h2> 
            <form onSubmit={handleInputUrl}>
              <div>
                <input id="url_website" className="form-control" placeholder="Entrer l'url du produit à suivre" required autoFocus onChange={e => [setUrl(e.target.value), setErrorUrl("")]}></input>
                {errorUrl}
              </div>
              <div className="text-center">
                <Button id="button-submit" variant="outline-primary" type="submit" value="submit">Confimer</Button>
              </div>
            </form>
          </main>
        </div>
      </body>
    );
  }
}

  

export default CreationSuivi;